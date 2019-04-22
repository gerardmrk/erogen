/* eslint-env node */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/camelcase */
const net = require("net");
const util = require("util");

const client = net.createConnection("/tmp/server.sock");

client.on("connect", () => {
  console.info("[CLIENT] connected");
  client.write(
    JSON.stringify({
      url: "/documentation",
      lang: "en",
    }),
  );
});

client.on("data", data => {
  console.info("[CLIENT] data received");

  const resp = JSON.parse(data.toString());
  console.log(resp);

  client.end();
  process.exit(0);
});

client.on("error", error => {
  console.error("[CLIENT] error", error);
  process.exit(1);
});
