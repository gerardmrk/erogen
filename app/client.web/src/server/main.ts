import { resolve } from "path";
import dotenv from "dotenv";

import { initServer, ServerConfig } from "./server";

dotenv.config({ path: "../../.env" });

(async (conf: ServerConfig) => {
  const srv = await initServer(conf);

  srv.listen(conf.port, conf.host, (err, addr) => {
    if (err) console.error(err), process.exit(1);
    console.info(`server listening on ${addr}`);
  });
})({
  port: parseInt(process.env.SERVER_PORT || "4200"),
  host: process.env.SERVER_HOST || "::",
  assets: {
    rootDir: resolve(__dirname, "../../dist/client"),
    urlPrefix: "/assets/",
    gzip: true,
    brotli: true,
    preferBrotli: true,
  },
});
