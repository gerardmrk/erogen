import { Server, ServerConfig } from "@server/server";
import { appendEncodingExt } from "./append-enc-ext";

const LIFECYCLE = "onRequest";

export default async (srv: Server, conf: ServerConfig): Promise<void> => {
  srv.addHook(
    LIFECYCLE,
    await appendEncodingExt(conf.assetsUrlPrefix, conf.assetsDir),
  );
};
