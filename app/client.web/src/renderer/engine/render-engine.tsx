import * as ReactDOMServer from "react-dom/server";
import { Overwrite } from "utility-types";
import { IRendererRequest, IRendererResponse } from "@renderer/proto";
import { StaticRouterContext } from "react-router";
import {
  getChunkExtractor,
  getStore,
  getAppElement,
  getMetaTags,
} from "./shared";
import { Store } from "@client/store";

export type RenderRequest = IRendererRequest;
// prettier-ignore
export type RenderResponse = Overwrite<IRendererResponse, {
    metas: string | undefined;
    app: string | undefined;
    links: string | undefined;
    styles: string | undefined;
    scripts: string | undefined;
    initialState: string | undefined;
}>;

export const renderEngine = (stats: AsyncModuleStats) => {
  const extractor = getChunkExtractor(stats);

  return async (request: RenderRequest, response: RenderResponse) => {
    try {
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

      response.app = ReactDOMServer.renderToString(app);

      response.metas = getMetaTags(headContext["helmet"]);
      response.initialState = JSON.stringify(store.getState());
      response.links = extractor.getLinkTags() + extractor.getStyleTags();
      response.styles = await extractor.getCssString();
      response.scripts = extractor.getScriptTags({ defer: "" });

      if (routerContext.url) {
        response.statusCode = 302;
        response.redirectTo = routerContext.url;
      } else {
        response.statusCode = routerContext.statusCode || 200;
      }
    } catch (err) {
      response.statusCode = 500;
      response.error = {
        message: err.message,
        stackTrace: err.stack,
      };
    }

    return response;
  };
};
