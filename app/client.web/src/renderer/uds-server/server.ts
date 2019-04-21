import * as fs from "fs";
import * as net from "net";
import * as util from "util";
import * as process from "process";
import uuidv4 from "uuid/v4";
import debug from "debug";
import { renderJSON } from "..";
import { Request } from "@renderer/engine";

const dsrv = debug("srv");
const dcon = debug("srv:conn");

const statAsync = util.promisify(fs.stat);
const unlinkAsync = util.promisify(fs.unlink);

type ConnectionsCache = {
  [connID: string]: net.Socket;
};

type ServerParams = {
  socketFile: string;
  asyncModuleStats: AsyncModuleStats;
};

export const server = async ({
  socketFile,
  asyncModuleStats
}: ServerParams) => {
  try {
    await tryRemovePrevSocketFile(socketFile);

    const connsCache: ConnectionsCache = {};
    const socketSrv = await createServer(asyncModuleStats, connsCache);

    process.on("SIGINT", () => {
      closeConnections(socketSrv, connsCache);
    });

    socketSrv.listen(socketFile, () => {
      dsrv("server listening on %s", socketFile);
    });
  } catch (error) {
    throw error;
  }
};

async function tryRemovePrevSocketFile(socketFile) {
  try {
    await statAsync(socketFile);
    dsrv("unlinking previous socket file..", socketFile);
    await unlinkAsync(socketFile);
  } catch (error) {
    if ((<NodeJS.ErrnoException>error).code !== "ENOENT") throw error;
    dsrv("socket file does not exist, will be created by server");
  }
}

async function createServer(
  stats: AsyncModuleStats,
  connsCache: ConnectionsCache
) {
  const render = renderJSON(stats);

  return net.createServer((conn: net.Socket) => {
    const connID = uuidv4();
    connsCache[connID] = conn;

    dcon("[%s] conn est.", connID);

    conn.on("data", async (data: Buffer) => {
      dcon("[%s] DATA", connID);
      const req: Request = JSON.parse(data.toString());
      conn.write(JSON.stringify(await render(req)));
    });

    conn.on("error", error => {
      dcon("[%s] ERROR", connID), conn.write(error.message);
    });

    conn.on("end", () => {
      dcon("[%s] END", connID), delete connsCache[connID];
    });
  });
}

function closeConnections(sockSrv: net.Server, connsCache: ConnectionsCache) {
  for (const [id, conn] of Object.entries(connsCache)) {
    // TODO: will implement soon
    dsrv("draining connection for %s", id);
    conn.end();
  }
  sockSrv.close();
  dsrv("server closed");
  process.exit(0);
}

export default server;
