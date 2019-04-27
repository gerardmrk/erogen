import * as ReactDOMServer from "react-dom/server";
import { IRendererRequest, IRendererResponse } from "@renderer/proto";
import {
  getChunkExtractor,
  getStore,
  getAppElement,
  getHTMLBits,
  getMetaTags,
} from "./shared";
import { Store } from "@client/store";
import { StaticRouterContext } from "react-router";

export type StreamRequest = IRendererRequest;

export type StreamResponse = NodeJS.WritableStream;

export type StreamMetaData = Pick<
  IRendererResponse,
  "statusCode" | "redirectTo" | "error" | "ttr"
>;

// prettier-ignore
export const streamEngine = () => {
  const extractor = getChunkExtractor();

  return async (request: StreamRequest, response: StreamResponse, metaData: StreamMetaData) => {
    const timerStart = process.hrtime.bigint();

    try {
      const htmlBits = getHTMLBits({
        lang: request.lang || "en",
        appMountPointID: INJECTED_APP_MOUNT_POINT_ID,
      });

      const store: Store = getStore();
      const headContext: object = {};
      const routerContext: StaticRouterContext = {};

      const app = getAppElement({
        url: request.url || "/",
        config: INJECTED_APP_CONFIG,
        store,
        extractor,
        headContext,
        routerContext,
      });

      // TODO: :(

      // well... looks like this is not yet viable
      // both react-helmet and react-helmet-async have race-conditions
      // when using streaming...

      const appStream = ReactDOMServer.renderToNodeStream(app);

      response.write(htmlBits.docStart);

      response.write(getMetaTags(headContext["helmet"]));

      response.write(extractor.getLinkTags());

      response.write(extractor.getStyleTags());

      response.write(htmlBits.postHeadTags);

      response.write(await extractor.getCssString());
      
      response.write(htmlBits.postInlineStyles);

      appStream.pipe(response, { end: false });

      appStream.on("end", () => {
        response.write(htmlBits.postApp);

        response.write(JSON.stringify(store.getState()));

        response.write(htmlBits.postInitialState);

        response.write(extractor.getScriptTags({ defer: "" }));
        
        response.write(htmlBits.docEnd);

        if (routerContext.url) {
          metaData.statusCode = 302;
          metaData.redirectTo = routerContext.url;
        } else {
          metaData.statusCode = routerContext.statusCode || 200;
        }
        metaData.ttr = `${process.hrtime.bigint() - timerStart}ns`; // TODO: change when protobufjs sets bigint for uint64
        response.end();
      });

      appStream.on("error", (err: Error) => {
        metaData.statusCode = 500;
        metaData.error = { message: err.message, stackTrace: err.stack };
        response.end();
      });
    } catch (err) {
      metaData.statusCode = 500;
      metaData.error = { message: err.message, stackTrace: err.stack };
      response.end();
    }
  };
};
