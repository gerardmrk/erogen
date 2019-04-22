import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { StaticRouter as Router } from "react-router";
import { Provider as StoreProvider } from "react-redux";
import { Overwrite } from "utility-types";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import { IRendererRequest, IRendererResponse } from "@renderer/proto";
import { storeCreator } from "@client/store";
import { Services } from "@client/services";
import { StaticRouterContext } from "react-router";
import { ConfigProvider } from "@client/views/contexts/config";
import App from "@client/views/core/App";
import Helmet, { HelmetData } from "react-helmet";

export type Request = IRendererRequest;
// prettier-ignore
export type Response = Overwrite<IRendererResponse, {
    htmlHead: string | undefined;
    htmlBody: string | undefined;
    htmlLinks: string | undefined;
    htmlStyles: string | undefined;
    htmlScripts: string | undefined;
}>;

export const renderEngine = (stats: AsyncModuleStats) => {
  return async (request: Request): Promise<Response> => {
    const extractor = new ChunkExtractor({
      stats,
      entrypoints: ["app"]
    });

    const response: Response = {
      statusCode: 200,
      redirectTo: "",
      error: null,
      ttr: "",
      htmlHead: undefined,
      htmlBody: undefined,
      htmlLinks: undefined,
      htmlStyles: undefined,
      htmlScripts: undefined
    };

    try {
      const requestUrl = request.url || "/";

      const services = new Services();
      const createStore = storeCreator(services);
      const routerContext: StaticRouterContext = {};

      response.htmlBody = ReactDOMServer.renderToString(
        <ConfigProvider config={INJECTED_APP_CONFIG}>
          <StoreProvider store={createStore(undefined)}>
            <Router location={requestUrl} context={routerContext}>
              <ChunkExtractorManager extractor={extractor}>
                <App />
              </ChunkExtractorManager>
            </Router>
          </StoreProvider>
        </ConfigProvider>
      );
      response.htmlHead = getMetaTags(Helmet.renderStatic());
      response.htmlLinks = extractor.getLinkTags();
      response.htmlStyles = extractor.getStyleTags();
      response.htmlScripts = extractor.getScriptTags();

      if (routerContext.url) {
        response.statusCode = 302;
        response.redirectTo = routerContext.url;
      } else {
        response.statusCode = routerContext.statusCode || 200;
        response.redirectTo = routerContext.url || "";
      }
    } catch (err) {
      response.statusCode = 500;
      response.error = err.message;
    }

    return response;
  };
};

function getMetaTags(data: HelmetData): string {
  let result = "";
  for (let dd = Object.values(data), i = 0, l = dd.length; i < l; i++) {
    result += dd[i].toString();
  }
  return result;
}
