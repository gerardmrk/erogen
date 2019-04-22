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
import i18n from "i18next";
import { I18nextProvider as I18nProvider } from "react-i18next";

export type Request = IRendererRequest;
// prettier-ignore
export type Response = Overwrite<IRendererResponse, {
    metas: string | undefined;
    app: string | undefined;
    links: string | undefined;
    styles: string | undefined;
    scripts: string | undefined;
    initialState: string | undefined;
}>;

export const renderEngine = (stats: AsyncModuleStats) => {
  const extractor = new ChunkExtractor({
    stats,
    entrypoints: ["app"]
  });

  return async (request: Request): Promise<Response> => {
    const response: Response = {
      statusCode: 200,
      redirectTo: "",
      error: null,
      ttr: "",
      metas: undefined,
      app: undefined,
      links: undefined,
      styles: undefined,
      scripts: undefined,
      initialState: undefined
    };

    try {
      const requestUrl = request.url || "/";

      const services = new Services();
      const store = storeCreator(services)(undefined);
      const routerContext: StaticRouterContext = {};

      response.app = ReactDOMServer.renderToString(
        <ConfigProvider config={INJECTED_APP_CONFIG}>
          <I18nProvider i18n={i18n}>
            <StoreProvider store={store}>
              <Router location={requestUrl} context={routerContext}>
                <ChunkExtractorManager extractor={extractor}>
                  <App />
                </ChunkExtractorManager>
              </Router>
            </StoreProvider>
          </I18nProvider>
        </ConfigProvider>
      );
      response.metas = getMetaTags(Helmet.renderStatic());
      response.initialState = JSON.stringify(store.getState());
      response.links = extractor.getLinkTags();
      response.styles = extractor.getStyleTags();
      response.scripts = extractor.getScriptTags();

      if (routerContext.url) {
        response.statusCode = 302;
        response.redirectTo = routerContext.url;
      } else {
        response.statusCode = routerContext.statusCode || 200;
        response.redirectTo = routerContext.url || "";
      }
    } catch (err) {
      response.statusCode = 500;
      response.error = {
        message: err.message,
        stackTrace: err.stack
      };
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
