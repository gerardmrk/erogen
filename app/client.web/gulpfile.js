/* eslint-env node */
/* eslint-disable no-console, @typescript-eslint/no-var-requires */
const { src, dest, parallel } = require("gulp");

const { paths } = require("./config/shared.paths");

exports.default = () => {};

function getRoutes() {}

function getCSSFiles() {
  return src(`${paths.clientBuild}/styles/*.css`);
}
