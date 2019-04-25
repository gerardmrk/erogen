import * as React from "react";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import { Store, storeCreator } from "@client/store";
import { Services } from "@client/services";
import { ConfigProvider } from "@client/views/contexts/config";
import { Provider as StoreProvider } from "react-redux";
import { StaticRouterContext, StaticRouter as Router } from "react-router";
import { App } from "@client/views/core/App";
import { HelmetData } from "react-helmet";

export type GetHTMLBitsParams = {
  appMountPointID: string;
};

export type GetAppElementParams = {
  url: string;
  config: AppConfig;
  store: Store;
  extractor: ChunkExtractor;
  routerContext: StaticRouterContext;
};

export const getChunkExtractor = (stats: AsyncModuleStats): ChunkExtractor => {
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

export const getAppElement = ({
  url,
  config,
  store,
  extractor,
  routerContext,
}: GetAppElementParams) => (
  <ConfigProvider config={config}>
    <StoreProvider store={store}>
      <Router location={url} context={routerContext}>
        <ChunkExtractorManager extractor={extractor}>
          <App />
        </ChunkExtractorManager>
      </Router>
    </StoreProvider>
  </ConfigProvider>
);

export const getMetaTags = (data: HelmetData): string => {
  let result = "";
  for (let dd = Object.values(data), i = 0, l = dd.length; i < l; i++) {
    result += dd[i].toString();
  }
  return result;
};

// export const purifyCSS = (html: string, ) => {};

export const getHTMLBits = ({ appMountPointID }: GetHTMLBitsParams) => ({
  docStart: '<!DOCTYPE html><html><head><meta charset="utf-8"/>',
  postHeadTags: `<style>`,
  postInlineStyles: `</style><style>html,body,#app-mount-point{width:100%;height:100%;}</style></head><body><div id=${appMountPointID}>`,
  postApp: `</div><script>window._INITIAL_STATE_ = `,
  postInitialState: ";</script>",
  docEnd: "</body></html>",
});
