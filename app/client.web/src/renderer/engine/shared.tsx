import * as React from "react";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import { Store, storeCreator } from "@client/store";
import { Services } from "@client/services";
import { ConfigProvider } from "@client/views/contexts/config";
import { Provider as StoreProvider } from "react-redux";
import { StaticRouterContext, StaticRouter as Router } from "react-router";
import { App } from "@client/views/core/App";
import { HelmetProvider as HeadProvider } from "react-helmet-async";
import PurgeCSS from "purgecss";

export type GetHTMLBitsParams = {
  lang: string;
  appMountPointID: string;
};

export type GetAppElementParams = {
  url: string;
  config: AppConfig;
  store: Store;
  extractor: ChunkExtractor;
  headContext: object;
  routerContext: StaticRouterContext;
};

export const getChunkExtractor = (): ChunkExtractor => {
  const stats = INJECTED_ASYNC_MODULE_STATS;

  return new ChunkExtractor({
    stats,
    entrypoints: ["app"],
  });
};

export const getStore = (): Store => {
  const services = new Services();
  const createStore = storeCreator(services);
  return createStore();
};

export const stripUnusedCSS = async (
  html: string,
  css: string,
): Promise<string> => {
  const result = new PurgeCSS({
    css: [{ raw: css, extension: "css" }],
    content: [{ raw: html, extension: "html" }],
  }).purge();
  return result.reduce((rr, r) => (rr += r.css), "");
};

export const getAppElement = ({
  url,
  config,
  store,
  extractor,
  headContext,
  routerContext,
}: GetAppElementParams) => (
  <ConfigProvider config={config}>
    <HeadProvider context={headContext}>
      <StoreProvider store={store}>
        <Router location={url} context={routerContext}>
          <ChunkExtractorManager extractor={extractor}>
            <App />
          </ChunkExtractorManager>
        </Router>
      </StoreProvider>
    </HeadProvider>
  </ConfigProvider>
);

export const getMetaTags = (data: object): string => {
  let result = "";
  for (let dd = Object.values(data), i = 0, l = dd.length; i < l; i++) {
    result += dd[i].toString();
  }
  return result;
};

export const htmlSplitter = () => {
  const [
    docStart,
    postLang,
    postMetas,
    postLinks,
    postStyles,
    postApp,
    postInitialState,
    docEnd,
  ] = INJECTED_GENERATED_HTML.split(/(?:{{{[A-Za-z0-9]+}}})/g);
  return ({ lang, appMountPointID }: GetHTMLBitsParams) => ({
    docStart,
    postLang,
    postMetas,
    postLinks,
    postStyles,
    postApp,
    postInitialState,
    docEnd,
  });
};
