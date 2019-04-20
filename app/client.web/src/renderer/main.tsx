import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { StaticRouter as Router } from "react-router";
import { Provider as StoreProvider } from "react-redux";
import { RendererRequest, RendererResponse } from "./proto";
import { storeCreator } from "@client/store";
import { Services } from "@client/services";
import { StaticRouterContext } from "react-router";
import { ConfigProvider } from "@client/views/contexts/config";
import App from "@client/views/core/App";

export const renderer = async (input: Uint8Array): Promise<Uint8Array> => {
  const timer = process.hrtime();

  let request: RendererRequest;
  let response: RendererResponse;

  request = RendererRequest.decode(input);

  response = RendererResponse.create({
    statusCode: 200,
    redirectTo: "",
    error: null,
    ttr: 0,
    renderedHtmlHead: null,
    renderedHtmlBody: null,
    renderedHtmlStyles: null,
    renderedHtmlScripts: null
  });

  try {
    const services = new Services();
    const createStore = storeCreator(services);
    const routerContext: StaticRouterContext = {};

    response.renderedHtmlBody = new TextEncoder().encode(
      ReactDOMServer.renderToString(
        <ConfigProvider config={INJECTED_APP_CONFIG}>
          <StoreProvider store={createStore(undefined)}>
            <Router location={request.url} context={routerContext}>
              <App />
            </Router>
          </StoreProvider>
        </ConfigProvider>
      )
    );

    if (routerContext.url) {
      response.statusCode = 302;
      response.redirectTo = routerContext.url;
    }
  } catch (err) {
    response.error = err.message;
  }

  response.ttr = process.hrtime(timer)[1] / (1000 * 1000);
  return RendererResponse.encode(response).finish();
};
