import * as React from "react";
import * as ReactDOM from "react-dom";
import StoreProvider from "react-redux/es/components/Provider";
import { BrowserRouter as Router } from "react-router-dom";

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

(({ config, devMode, initialState }: AppParams) => {
  const services = new Services();

  const createStore = storeCreator(services, devMode);
  const store = createStore(initialState as State);

  const defaultLang = "en";
  initI18N(defaultLang);

  ReactDOM.render(
    <ConfigProvider config={config}>
      <StoreProvider store={store}>
        <Router>
          <App />
        </Router>
      </StoreProvider>
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
