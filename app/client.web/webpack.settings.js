/* eslint-env node */
/* eslint-disable */
const dotenv = require("dotenv");
const paths = require("./shared.paths");

module.exports = rootAppDir => ({
  mode = "development",
  source = "client",
  sourceMap,
}) => {
  if (sourceMap === "true" || sourceMap === "false") {
    sourceMap = JSON.parse(sourceMap);
  }

  if (mode !== "development" && mode !== "production") {
    throw new Error("'mode' option must be 'development' or 'production'");
  }

  if (source !== "client" && source !== "renderer") {
    throw new Error("'source' option must be 'client' or 'renderer'");
  }

  if (
    typeof sourceMap !== "boolean" &&
    (sourceMap !== "client" || sourceMap !== "renderer")
  ) {
    throw new Error(
      "'sourceMap' option must be either: true, false, 'client', 'renderer'",
    );
  }

  // load custom envs if provided
  dotenv.config({ path: `${paths.appDir}/.env` });

  const appStage = process.env.APP_STAGE || "local";

  let enableSourceMap = sourceMap;
  if (typeof enableSourceMap === "string") {
    switch (enableSourceMap) {
      case "client":
        enableSourceMap = source === "client";
        break;
      case "renderer":
        enableSourceMap = source === "renderer";
        break;
      default:
        enableSourceMap = false;
    }
  }
  enableSourceMap = mode === "development" || enableSourceMap;

  // TODO: derive from stdin
  const appConfig = {
    appStage,
    appUrl: "http://127.0.0.1:4200",
    appName: "Alaskan",
    appDescription: "Designer Drugs",
    appImagePath: `/assets/images/logo.svg`,
    appTwitterHandle: `@404`,
    appTwitterCardType: "summary_large_image",
    defaultLanguage: "en",
    supportedLanguages: ["en", "de", "es", "fr", "hi", "ms", "pt", "ru", "zh"],
  };

  const devHost = "127.0.0.1";
  const devPort = 4200;
  const publicPath = mode === "development" ? "/" : "/assets/";
  const appEntrypointID = "app";
  const appMountPointID = "app-mount-point";
  const translationsPath = `${publicPath}i18n/translations/{{lng}}/{{ns}}.json`;
  const untranslatedPath = `${publicPath}i18n/translations/${appConfig.defaultLanguage}/{{ns}}.json`; // prettier-ignore

  const settings = {
    mode,
    source,
    // convenience flags
    devMode: mode === "development",
    prodMode: mode === "production",
    clientBuild: source === "client",
    rendererBuild: source === "renderer",
    // derived
    appConfig,
    appEntrypointID,
    appMountPointID,
    enableSourceMap,
    publicPath,
    translationsPath,
    untranslatedPath,
    devHost,
    devPort,
  };

  return settings;
};
