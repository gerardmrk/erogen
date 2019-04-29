/* eslint-env node */
/* eslint-disable no-console, @typescript-eslint/no-var-requires */
const { src, dest, parallel } = require("gulp");

exports.default = () => {};

function getStyleSheets() {
  return src();
}
