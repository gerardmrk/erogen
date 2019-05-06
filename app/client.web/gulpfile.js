/* eslint-disable */
const { promises, createReadStream, createWriteStream } = require("fs");
const { constants, createGzip, createBrotliCompress } = require("zlib");

const { src, dest, series, parallel } = require("gulp");
const pbjs = require("protobufjs/cli/pbjs");
const pbts = require("protobufjs/cli/pbts");
const wpk = require("webpack");
const PurgeCSS = require("purgecss");

const { paths } = require("./config/shared.paths");
const webpackConfig = require("./config/webpack.config");

const statAsync = promises.stat;
const writeFileAsync = promises.writeFile;

// =============================================================================
// Protobufs code generation
// =============================================================================
const generateProto = async () => {
  // prettier-ignore
  await protobufjs(
    "--target", "static-module",
    "--wrap", "commonjs",
    "--out", `${paths.protobufDir}/index.js`,
    `${paths.protobufDef}`,
  );

  await protobufts(
    "--out",
    `${paths.protobufDir}/index.d.ts`,
    `${paths.protobufDir}/index.js`,
  );
};

// =============================================================================
// Client build
// =============================================================================
const buildClient = async () => {
  const stats = await webpack(
    await webpackConfig({
      source: "client",
      mode: "production",
      sourceMap: false,
    }),
  );

  console.info(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      cached: false,
      assetsSort: "chunks",
      // tone down information in console
      excludeAssets: [/^icons\//, /\.map$/, /\.br$/, /\.gz$/, /\.LICENSE$/],
    }),
  );
};

// =============================================================================
// Renderer build
// =============================================================================
const buildRenderer = async () => {
  const stats = await webpack(
    await webpackConfig({
      source: "renderer",
      mode: "production",
      sourceMap: false,
    }),
  );

  console.info(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      cached: false,
      assetsSort: "chunks",
      // tone down information in console
      excludeAssets: [
        /\.map$/,
        /\.br$/,
        /\.gz$/,
        /\.LICENSE$/,
        /^\.\.\/client\//,
      ],
      warningsFilter: [
        // purgecss pkg has a dynamic require statement for loading
        // a config file at class instantiation. build is not affected.
        /\/node_modules\/purgecss\/lib\/purgecss\.es\.js/,
        /\/node_modules\/i18next-node-fs-backend\/lib\/index\.js/,
        /\/node_modules\/js-yaml\/lib\/js-yaml\/type\/binary\.js/,
        /\/node_modules\/js-yaml\/lib\/js-yaml\/type\/js\/function\.js/,
      ],
    }),
  );
};

// =============================================================================
// Server build
// =============================================================================
const buildServer = async () => {
  // const stats = await webpack(
  //   await webpackConfig({
  //     source: "server",
  //     mode: "production",
  //     sourceMap: true,
  //   }),
  // );
  // console.info(
  //   stats.toString({
  //     colors: true,
  //     modules: false,
  //     children: false,
  //     cached: false,
  //     assetsSort: "chunks",
  //     excludeAssets: [/\.LICENSE$/].filter(x => !!x),
  //   }),
  // );
};

// =============================================================================
// Purge main styles entrypoint
// =============================================================================
const purgeMainStylesChunk = async () => {
  const stats = require(paths.asyncModuleStats);
  const { RendererResponse } = require(paths.protobufDir);

  const vendorsAssetStats = stats["assetsByChunkName"]["vendors"];
  const stylesChunk = vendorsAssetStats.find(a => a.endsWith(".css"));
  const destFile = `${paths.clientBuild}/${stylesChunk}`;

  const htmls = [];
  const cache = new Map();
  await getRoutes(cache);

  cache.forEach(val => htmls.push(RendererResponse.decode(val).app));

  const result = trimCss(destFile, htmls);

  await writeFileAsync(destFile, result, "utf-8");
  compressWithGzip(destFile);
  compressWithBrotli(destFile);
};

const buildProd = series(
  // generateProto,
  buildClient,
  buildRenderer,
  buildServer,
  purgeMainStylesChunk,
);

exports.buildClient = buildClient;
exports.buildRenderer = buildRenderer;
exports.buildServer = buildServer;
exports.generateProto = generateProto;
exports.purgeMainStylesChunk = purgeMainStylesChunk;
exports.buildProd = buildProd;
exports.default = buildProd;

// =============================================================================
// Helpers
// =============================================================================

async function getRoutes(cache) {
  const { Renderer } = require(paths.rendererBuild);
  const renderer = new Renderer({ debug: true });

  await renderer.init({
    cache: { data: cache },
    prerender: {
      all: true,
      lang: "en",
      protoOnly: true,
    },
    internationalization: {
      debug: true,
      translations: `${paths.clientBuild}/i18n/translations`,
    },
  });
  console.log(cache);
}

function compressWithGzip(file) {
  const inp = createReadStream(file);
  const out = createWriteStream(`${file}.gz`);

  // prettier-ignore
  inp.pipe(createGzip({
    chunkSize: 32 * 1024,
    level: constants.Z_BEST_COMPRESSION,
  })).pipe(out);
}

async function compressWithBrotli(file) {
  const inp = createReadStream(file);
  const out = createWriteStream(`${file}.br`);
  const { size } = await statAsync(file);

  // prettier-ignore
  inp.pipe(createBrotliCompress({
    chunkSize: 32 * 1024,
    level: constants.Z_BEST_COMPRESSION,
    params: {
      [constants.BROTLI_PARAM_MODE]: constants.BROTLI_MODE_TEXT,
      [constants.BROTLI_PARAM_QUALITY]: 11,
      [constants.BROTLI_PARAM_SIZE_HINT]: size,
    }
  })).pipe(out);
}

function trimCss(cssFile, htmls) {
  const purgecss = new PurgeCSS({
    css: [cssFile],
    content: htmls.map(html => ({ raw: html, extension: "html" })),
  });
  return purgecss.purge()[0]["css"];
}

async function protobufjs(...args) {
  return new Promise((resolve, reject) => {
    pbjs.main(args, (err, out) => {
      if (err) return reject(err);
      return resolve(out);
    });
  });
}

async function protobufts(...args) {
  return new Promise((resolve, reject) => {
    pbts.main(args, (err, out) => {
      if (err) return reject(err);
      return resolve(out);
    });
  });
}

async function webpack(config) {
  return new Promise((resolve, reject) => {
    wpk(config, (err, stats) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) console.error(err.details);
        return reject(err);
      }

      const info = stats.toJson();

      if (stats.hasErrors()) {
        console.error(info.errors);
        return reject(err);
      }

      return resolve(stats);
    });
  });
}
