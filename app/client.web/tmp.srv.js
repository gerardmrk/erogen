/* eslint-env node */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/camelcase */
const { renderJSON } = require("./dist/renderer");

const stats = require("./dist/client/async-modules.json");

(async () => {
  const render = renderJSON(stats);
  const data = await render({ url: "/support", lang: "en" });
  console.log(data);
})();
