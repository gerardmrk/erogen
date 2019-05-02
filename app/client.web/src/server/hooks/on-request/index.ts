import { Server, ServerConfig } from "@server/server";
import { serveStaticHook } from "./serve-static-hook";

const LIFECYCLE = "onRequest";

export default async (srv: Server, conf: ServerConfig): Promise<void> => {
  srv.addHook(LIFECYCLE, await serveStaticHook(conf.assets));
};
