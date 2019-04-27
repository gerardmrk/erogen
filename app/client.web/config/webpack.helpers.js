/* eslint-env node */
/* eslint-disable no-console, @typescript-eslint/no-var-requires, @typescript-eslint/camelcase */
const {
  promises: { readFile },
} = require("fs");

/**
 * Takes any number of arguments and return an array with falsy values removed.
 * @param  {...any} args ...
 */
exports.compact = (...args) => args.filter(val => !!val);

exports.getAsyncModuleStats = async clientDest => {
  return await readFile(`${clientDest}/async-modules.json`, "utf-8");
};

exports.getGeneratedHTML = async clientDest => {
  return await readFile(`${clientDest}/index.ssr.hbs`, "utf-8");
};
