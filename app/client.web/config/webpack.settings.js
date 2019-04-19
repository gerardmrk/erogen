/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/camelcase */
const dotenv = require("dotenv");

module.exports = rootAppDir => ({
  mode = "development",
  source = "client",
}) => {
  if (mode !== "development" && mode !== "production") {
    throw new Error("'mode' option must be 'development' or 'production'");
  }

  if (source !== "client" && source !== "renderer") {
    throw new Error("'source' option must be 'client' or 'renderer'");
  }

  // load custom envs if provided
  dotenv.config({ path: `${rootAppDir}/.env` });

  const appStage = process.env.APP_STAGE || "local";

  const appConfig = {
    appStage,
    appUrl: "http://localhost:4200",
    appName: "Erogen",
    appDescription:
      "Next generation, state of the art, distributed satellite infrastructure",
    appImagePath: `/assets/images/logo.svg`,
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
  };

  return settings;
};
