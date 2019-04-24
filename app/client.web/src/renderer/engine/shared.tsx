import * as React from "react";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import { Store, storeCreator } from "@client/store";
import { Services } from "@client/services";
import { ConfigProvider } from "@client/views/contexts/config";
import { Provider as StoreProvider } from "react-redux";
import { StaticRouterContext, StaticRouter as Router } from "react-router";
import { App } from "@client/views/core/App";

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

type GetAppElementParams = {
  url: string;
  config: AppConfig;
  store: Store;
  extractor: ChunkExtractor;
  routerContext: StaticRouterContext;
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
