/* eslint-env node */
/* eslint-disable no-console, @typescript-eslint/no-var-requires */
const { TextDecoder } = require("util");
const { src, dest, parallel } = require("gulp");
const purgecss = require("gulp-purgecss");
const { paths } = require("./config/shared.paths");

async function getRoutes(cache) {
  const { Renderer } = require("./dist/renderer");
  const renderer = new Renderer({ cache: { data: cache } });
  await renderer.prerenderRoutes({
    all: true,
    lang: "en",
    writeToDisk: "./.routes",
  });
}

function getCSSFiles() {
  return src(`${paths.clientBuild}/styles/*.css`);
}

function getModuleStats() {
  const stats = require(paths.asyncModuleStats);
  return stats;
}

function trimVendorsCss(cssFile, htmls) {
  return src(cssFile)
    .pipe(
      purgecss({
        content: [...htmls.map(html => ({ raw: html, extension: html }))],
      }),
    )
    .pipe("./xo");
}

exports.default = async () => {
  const stats = getModuleStats();
  const vendorsAssetStats = stats["assetsByChunkName"]["vendors"];
  const vendorsStylesheet = vendorsAssetStats.find(a => a.endsWith(".css"));

  const cache = new Map();
  await getRoutes(cache);
  console.log(cache.keys());
};
