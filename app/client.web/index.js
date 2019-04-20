/* eslint-env node */

require("@babel/register")({});
require("@babel/polyfill");

const renderer = require("./dist/renderer/index");

console.log(renderer);
