/* eslint-env node */
/* eslint-disable no-console, @typescript-eslint/no-var-requires */
const { promises } = require("fs");
const { src, dest, parallel } = require("gulp");
const PurgeCSS = require("purgecss");
const { paths } = require("./config/shared.paths");
const { Renderer } = require("./dist/renderer");
const { RendererResponse } = require("./dist/renderer/proto");

const writeFileAsync = promises.writeFile;

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
