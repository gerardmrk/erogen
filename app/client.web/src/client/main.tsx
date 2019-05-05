import "@client/views/theme/semantic.less";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { loadableReady } from "@loadable/component";
import { Provider as StoreProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { I18nextProvider as I18nProvider } from "react-i18next";
import { HelmetProvider as HeadProvider } from "react-helmet-async";

import { Services } from "@client/services";
import { storeCreator, State } from "@client/store";
import App from "@client/views/core/App";
import { initI18N } from "./main.i18n";
import { initServiceWorker } from "./main.offline";
import { ConfigProvider } from "./views/contexts/config";

type AppParams = {
  devMode: boolean;
  config: AppConfig;
  publicPath: string;
  initialState: Partial<State>;
  appMountPointID: string;
};

(async ({
  config,
  devMode,
  initialState,
  appMountPointID,
  publicPath,
}: AppParams) => {
  const render = devMode ? ReactDOM.render : ReactDOM.hydrate;

  const services = new Services();

  const createStore = storeCreator(services, devMode);
  const store = createStore(initialState as State);

  if (!devMode) {
    await loadableReady();
  }

  const i18n = await initI18N(publicPath);

  const app = (
    <ConfigProvider config={config}>
      <I18nProvider i18n={i18n}>
        <HeadProvider>
          <StoreProvider store={store}>
            <Router>
              <App />
            </Router>
          </StoreProvider>
        </HeadProvider>
      </I18nProvider>
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
  config: INJECTED_APP_CONFIG,
  initialState: window._INITIAL_STATE_,
  appMountPointID: INJECTED_APP_MOUNT_POINT_ID,
  publicPath: INJECTED_PUBLIC_PATH,
});
