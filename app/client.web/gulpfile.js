/* eslint-env node */
/* eslint-disable no-console, @typescript-eslint/no-var-requires */
const { src, dest, parallel } = require("gulp");

const { paths } = require("./config/shared.paths");

async function getRoutes() {
  const { Renderer } = require("./dist/renderer");
  const dataCache = new Map();
  const renderer = new Renderer({ cache: { data: dataCache } });
  await renderer.prerenderRoutes({
    all: true,
    lang: "en",
    writeToDisk: "./.routes",
  });
  console.log(dataCache.keys());
}

function getCSSFiles() {
  return src(`${paths.clientBuild}/styles/*.css`);
}

exports.default = async () => {
  return await getRoutes();
};
