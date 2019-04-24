// import * as ReactDOMServer from "react-dom/server";
// import { IRendererRequest } from "@renderer/proto";
// import { getChunkExtractor, getStore, getAppElement } from "./shared";
// import { Store } from "@client/store";
// import { StaticRouterContext } from "react-router";

// export type StreamRequest = IRendererRequest;

// export type StreamResponse = "";

// export const streamEngine = (stats: AsyncModuleStats) => {
//   const extractor = getChunkExtractor(stats);

//   return (request: StreamRequest): StreamResponse => {
//     try {
//       const store: Store = getStore();
//       const routerContext: StaticRouterContext = {};

//       const stream = ReactDOMServer.renderToNodeStream(
//         getAppElement({
//           url: request.url || "/",
//           config: INJECTED_APP_CONFIG,
//           store,
//           extractor,
//           routerContext,
//         }),
//       );
//     } catch (err) {
//       throw err;
//     }
//   };
// };
// const SSR_STREAM_HTML_START = `<!DOCTYPE html>
// <html>
// <head><meta charset="utf-8"/></head>
// <body><noscript>JavaScript must be enabled to run this app.</noscript><div id="#${INJECTED_APP_MOUNT_POINT_ID}">`;

// const SSR_STREAM_HTML_PRE_INITIAL_STATE =
//   "</div><script>window._INITIAL_STATE_ = ";

// const SSR_STREAM_HTML_POST_INITIAL_STATE = ";</script>";

// const SSR_STREAM_HTML_END = "</body></html>";
