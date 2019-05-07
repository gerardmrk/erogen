import "@client/views/theme/semantic.less";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { loadableReady } from "@loadable/component";
import { Provider as StoreProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider as HeadProvider } from "react-helmet-async";

import { Services } from "@client/services";
import { storeCreator, State } from "@client/store";
import App from "@client/views/core/App";
import { initServiceWorker } from "./main.offline";
import { ConfigProvider } from "./views/core/ConfigProvider";
import I18nProvider from "./views/core/I18nProvider";

type AppParams = {
  devMode: boolean;
  appConfig: AppConfig;
  initialState: Partial<State>;
  appMountPointID: string;
};

(async ({ appConfig, devMode, initialState, appMountPointID }: AppParams) => {
  const render = devMode ? ReactDOM.render : ReactDOM.hydrate;

  const services = new Services();

  const createStore = storeCreator(services, devMode);
  const store = createStore(initialState as State);

  if (!devMode) {
    await loadableReady();
  }

  const config = {
    app: appConfig,
    devMode,
    ssrMode: false,
    publicPath: "",
    translationsPath: "",
  };

  const app = (
    <ConfigProvider config={config}>
      <StoreProvider store={store}>
        <I18nProvider>
          <HeadProvider>
            <Router>
              <App />
            </Router>
          </HeadProvider>
        </I18nProvider>
      </StoreProvider>
    </ConfigProvider>
  );

  render(app, document.getElementById(appMountPointID), () => {
    initServiceWorker((error: Error | null) => {
      if (error) {
        services.errorReporter.logError(error);
        throw error;
      }
    });
  });
})({
  devMode: INJECTED_DEV_MODE,
  appConfig: INJECTED_APP_CONFIG,
  initialState: window._INITIAL_STATE_,
  appMountPointID: INJECTED_APP_MOUNT_POINT_ID,
});
