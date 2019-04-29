/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require("path");

const rootDir = resolve(__dirname, "..", "..", "..");
const rootConfigDir = `${rootDir}/config`;

const appDir = resolve(__dirname, "..");
const cacheDir = `${appDir}/.cache`;
const configDir = `${appDir}/config`;

const sourceDir = `${appDir}/src`;
const clientSrc = `${sourceDir}/client`;
const rendererSrc = `${sourceDir}/renderer`;
const serverSrc = `${sourceDir}/server`;

const buildDir = `${appDir}/dist`;
const clientBuild = `${buildDir}/client`;
const rendererBuild = `${buildDir}/renderer`;
const serverBuild = `${buildDir}/server`;

exports.paths = {
  /**
   * Directories
   */

  rootDir,
  rootConfigDir,
  appDir,
  cacheDir,
  configDir,
  sourceDir,
  clientSrc,
  rendererSrc,
  serverSrc,
  buildDir,
  clientBuild,
  rendererBuild,
  serverBuild,

  /**
   * Files
   */

  htmlTemplate: `${clientSrc}/index.html`,
  asyncModuleStats: `${clientBuild}/async-modules.json`,
  logoImage: `${rootConfigDir}/logo/logo.png`,
};
