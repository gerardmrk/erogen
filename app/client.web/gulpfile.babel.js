/* eslint-env node */
/* eslint-disable no-console, @typescript-eslint/no-use-before-define */
import { promises } from "fs";
import { spawn } from "child_process";

import { src, dest, series, parallel } from "gulp";
import pbjs from "protobufjs/cli/pbjs";
import pbts from "protobufjs/cli/pbts";
import wpk from "webpack";
import PurgeCSS from "purgecss";

import { paths } from "./config/shared.paths";
import { Renderer } from "./dist/renderer";
import { RendererResponse } from "./dist/renderer/proto";
import webpackConfig from "./config/webpack.config.babel";

const writeFileAsync = promises.writeFile;

// prettier-ignore
export const generateProto = async () => {
  await protobufjs(
    "--target", "static-module",
    "--wrap", "commonjs",
    "--out", `${paths.protobufDir}/index.js`,
    `${paths.protobufDef}`,
  );

  await protobufts(
    "--out", `${paths.protobufDir}/index.d.ts`,
    `${paths.protobufDir}/index.js`,
  );
};

export const buildClient = async () => {
  await webpack(
    await webpackConfig({
      source: "client",
      mode: "production",
      sourceMap: false,
    }),
  );
};

export const buildRenderer = async () => {
  await webpack(
    await webpackConfig({
      source: "renderer",
      mode: "production",
      sourceMap: false,
    }),
  );
};

export const buildServer = async () => {
  // await webpack(
  //   await webpackConfig({
  //     source: "server",
  //     mode: "production",
  //     sourceMap: true,
  //   }),
  // );
};

export const buildProd = series(
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

      if (stats.hasWarnings()) {
        console.warn(info.warnings);
      }

      // console.info(stats.toString());

      return resolve(stats);
    });
  });
}
