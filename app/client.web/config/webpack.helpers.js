/* eslint-env node */
/* eslint-disable no-console, @typescript-eslint/no-var-requires, @typescript-eslint/camelcase */
import { promises } from "fs";
import { paths } from "./shared.paths";

const readFileAsync = promises.readFile;

/**
 * Takes any number of arguments and return an array with falsy values removed.
 * @param  {...any} args ...
 */
export const compact = (...args) => args.filter(val => !!val);

export const getAsyncModuleStats = async () => {
  return await readFileAsync(
    `${paths.clientBuild}/async-modules.json`,
    "utf-8",
  );
};

export const getGeneratedHTML = async () => {
  return await readFileAsync(`${paths.clientBuild}/index.ssr.hbs`, "utf-8");
};
