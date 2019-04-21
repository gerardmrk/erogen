// import { readFile } from "fs";
// import { promisify } from "util";
import parseargs from "minimist";
import udsServer from "./server";
import asyncModuleStats from "dist/client/async-modules.json";

// const readFileAsync = promisify(readFile);

const main = async (settings: parseargs.ParsedArgs) => {
  try {
    validateSettings(settings);

    const socketFile = settings["addr"];
    // const asyncModuleStats = JSON.parse(
    //   await readFileAsync(settings["statsfile"], "utf8")
    // );

    switch (<string>settings.mode) {
      case "uds":
        await udsServer({
          socketFile,
          asyncModuleStats: <any>asyncModuleStats
        });
      default:
        return;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

function validateSettings(settings: object) {
  if (!settings["mode"]) {
    throw new Error("'mode' must be either 'uds' or 'tcp'");
  }

  if (!settings["addr"]) {
    throw new Error("'addr' must be specified");
  }
}

main(parseargs(process.argv.slice(2)));
