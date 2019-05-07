/* eslint-env node */
/* eslint-disable */
const { resolve } = require("path");

const rootDir = resolve(__dirname, "..", "..", "..");
const rootConfigDir = `${rootDir}/config`;

const appDir = resolve(__dirname, "..");
const cacheDir = `${appDir}/.cache`;
const configDir = `${appDir}/config`;
const i18nDir = `${appDir}/i18n`;

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
   * References
   */

  rootDir,
  rootConfigDir,
  appDir,
  cacheDir,
  configDir,
  i18nDir,
  sourceDir,
  clientSrc,
  rendererSrc,
  serverSrc,
  buildDir,
  clientBuild,
  rendererBuild,
  serverBuild,

  /**
   * Configurable
   */

  tsconfig: `${appDir}/tsconfig.json`,
  tsconfigClient: `${appDir}/tsconfig.client.json`,
  tsconfigClientTest: `${appDir}/tsconfig.client.test.json`,
  tsconfigRenderer: `${appDir}/tsconfig.renderer.json`,
  tsconfigRendererTest: `${appDir}/tsconfig.renderer.test.json`,
  tsconfigServer: `${appDir}/tsconfig.server.json`,
  tsconfigServerTest: `${appDir}/tsconfig.server.test.json`,

  htmlTemplate: `${clientSrc}/index.ejs`,
  asyncModuleStats: `${clientBuild}/async-modules.json`,
  logoImage: `${rootConfigDir}/logo/logo.png`,
  protobufDef: `${sourceDir}/renderer.proto`,
  protobufDir: `${rendererSrc}/proto`,
  translationsDir: `${i18nDir}/translations`,
};
