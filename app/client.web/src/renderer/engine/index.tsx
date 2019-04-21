import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { StaticRouter as Router } from "react-router";
import { Provider as StoreProvider } from "react-redux";
import { IRendererRequest, IRendererResponse } from "../proto";
import { storeCreator } from "@client/store";
import { Services } from "@client/services";
import { StaticRouterContext } from "react-router";
import { ConfigProvider } from "@client/views/contexts/config";
import App from "@client/views/core/App";
import { Overwrite } from "utility-types";

export type Request = IRendererRequest;
export type Response = Overwrite<
  IRendererResponse,
  {
    renderedHtmlHead: string | undefined;
    renderedHtmlBody: string | undefined;
    renderedHtmlStyles: string | undefined;
    renderedHtmlScripts: string | undefined;
  }
>;

export const render = async (request: Request): Promise<Response> => {
  const response: Response = {
    statusCode: 200,
    redirectTo: "",
    error: null,
    ttr: 0,
    renderedHtmlHead: undefined,
    renderedHtmlBody: undefined,
    renderedHtmlStyles: undefined,
    renderedHtmlScripts: undefined
  };

  try {
    const requestUrl = request.url || "/";

    const services = new Services();
    const createStore = storeCreator(services);
    const routerContext: StaticRouterContext = {};

    response.renderedHtmlBody = ReactDOMServer.renderToString(
      <ConfigProvider config={INJECTED_APP_CONFIG}>
        <StoreProvider store={createStore(undefined)}>
          <Router location={requestUrl} context={routerContext}>
            <App />
          </Router>
        </StoreProvider>
      </ConfigProvider>
    );

    if (routerContext.url) {
      response.statusCode = 302;
      response.redirectTo = routerContext.url;
    }
  } catch (err) {
    response.error = err.message;
  }

  return response;
};
