import parseargs from "minimist";
import udsServer from "./server";

const main = async (settings: parseargs.ParsedArgs) => {
  try {
    validateSettings(settings);

    const socketFile = settings["addr"];

    switch (<string>settings.mode) {
      case "uds":
        await udsServer({ socketFile });
      default:
        return;
    }
  } catch (error) {
    if (
      error.code === "ENOENT" &&
      error.syscall === "open" &&
      error.path === settings["statsfile"]
    ) {
      console.error("Stats file not found at specified path");
      return;
    } else {
      console.error(error);
      return;
    }
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
