/* eslint-disable */
const { promises } = require("fs");
const { spawn } = require("child_process");

const { src, dest, series, parallel } = require("gulp");
const pbjs = require("protobufjs/cli/pbjs");
const pbts = require("protobufjs/cli/pbts");
const wpk = require("webpack");
const PurgeCSS = require("purgecss");

const { paths } = require("./config/shared.paths");
const { Renderer } = require("./dist/renderer");
const { RendererResponse } = require("./dist/renderer/proto");
const webpackConfig = require("./config/webpack.config");

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
      excludeAssets: [/\.map$/, /\.br$/, /\.gz$/, /\.LICENSE$/, /^client\//],
      warningsFilter: [
        // purgecss pkg has a dynamic require statement for loading
        // a config file at class instantiation. build is not affected.
        /\/node_modules\/purgecss\/lib\/purgecss\.es\.js/,
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
  //     // tone down information in console
  //     excludeAssets: [
  //       /^icons\//,
  //       /\.map$/,
  //       /\.br$/,
  //       /\.gz$/,
  //       /\.LICENSE$/,
  //       rendererBuild && /^client\//,
  //     ].filter(x => !!x),
  //     warningsFilter: [
  //       // purgecss pkg has a dynamic require statement for loading
  //       // a config file at class instantiation. build is not affected.
  //       /\/node_modules\/purgecss\/lib\/purgecss\.es\.js/,
  //     ],
  //   }),
  // );
};

exports.buildServer = buildServer;
exports.buildRenderer = buildRenderer;
exports.buildClient = buildClient;
exports.generateProto = generateProto;
exports.buildProd = series(
  generateProto,
  buildClient,
  buildRenderer,
  buildServer,
);

async function getRoutes(cache) {
  const renderer = new Renderer({ cache: { data: cache } });
  await renderer.prerenderRoutes({
    all: true,
    lang: "en",
    protoOnly: true,
  });
}

function trimVendorsCss(cssFile, htmls) {
  const purgecss = new PurgeCSS({
    css: [cssFile],
    content: htmls.map(html => ({ raw: html, extension: "html" })),
  });
  return purgecss.purge()[0]["css"];
}

exports.default = async () => {
  const stats = require(paths.asyncModuleStats);
  const vendorsAssetStats = stats["assetsByChunkName"]["vendors"];
  const vendorsStylesheet = vendorsAssetStats.find(a => a.endsWith(".css"));

  const cache = new Map();
  await getRoutes(cache);

  let htmls = [];
  cache.forEach(val => {
    htmls.push(RendererResponse.decode(val).app);
  });

  const result = trimVendorsCss(
    `${paths.clientBuild}/${vendorsStylesheet}`,
    htmls,
  );

  await writeFileAsync(
    `${paths.clientBuild}/${vendorsStylesheet}`,
    result,
    "utf-8",
  );
};

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
