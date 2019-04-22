/* eslint-env node */
/* eslint-disable no-console, @typescript-eslint/no-var-requires, @typescript-eslint/camelcase */
const dotenv = require("dotenv");

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
  dotenv.config({ path: `${rootAppDir}/.env` });

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

  const appConfig = {
    appStage,
    appUrl: "http://localhost:4200",
    appName: "Erogen",
    appDescription:
      "Next generation, state of the art, distributed satellite infrastructure",
    appImagePath: `/assets/images/logo.svg`,
    appTwitterHandle: `@404`,
    appTwitterCardType: "summary_large_image",
  };

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
    enableSourceMap,
  };

  return settings;
};
