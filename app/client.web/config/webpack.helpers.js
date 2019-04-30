/* eslint-env node */
/* eslint-disable */
const { promises } = require("fs");
const { paths } = require("./shared.paths");

const readFileAsync = promises.readFile;

/**
 * Takes any number of arguments and return an array with falsy values removed.
 * @param  {...any} args ...
 */
exports.compact = (...args) => args.filter(val => !!val);

exports.getAsyncModuleStats = async () => {
  return await readFileAsync(
    `${paths.clientBuild}/async-modules.json`,
    "utf-8",
  );
};

exports.getGeneratedHTML = async () => {
  return await readFileAsync(`${paths.clientBuild}/index.ssr.hbs`, "utf-8");
};
