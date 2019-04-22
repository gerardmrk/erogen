import "@themeStyles";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { loadableReady } from "@loadable/component";
import { Provider as StoreProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { I18nextProvider as I18nProvider } from "react-i18next";

import { Services } from "@client/services";
import { storeCreator, State } from "@client/store";
import App from "@client/views/core/App";
import { initI18N } from "./main.i18n";
import { initServiceWorker } from "./main.offline";
import { ConfigProvider } from "./views/contexts/config";

type AppParams = {
  devMode: boolean;
  config: AppConfig;
  initialState: Partial<State>;
};

(async ({ config, devMode, initialState }: AppParams) => {
  const render = devMode ? ReactDOM.render : ReactDOM.hydrate;

  const services = new Services();

  const createStore = storeCreator(services, devMode);
  const store = createStore(initialState as State);

  const defaultLang = "en";
  const i18n = initI18N(defaultLang);

  if (!devMode) {
    await loadableReady();
  }

  render(
    <ConfigProvider config={config}>
      <I18nProvider i18n={i18n}>
        <StoreProvider store={store}>
          <Router>
            <App />
          </Router>
        </StoreProvider>
      </I18nProvider>
    </ConfigProvider>,
    document.getElementById("app-mount-point")
  );

  initServiceWorker((error: Error | null) => {
    if (error) {
      services.errorReporter.logError(error);
      throw error;
    }
  });
})({
  devMode: INJECTED_DEV_MODE,
  config: INJECTED_APP_CONFIG,
  initialState: window._INITIAL_STATE_
});
