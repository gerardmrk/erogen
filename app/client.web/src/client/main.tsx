import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider as StoreProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { Services } from "@client/services";
import { storeCreator, State } from "@client/store";
import App from "@client/views/core/App";
import { configureServiceWorker } from "./offline";
import { AppConfigProvider } from "./views/contexts/app-config";

type AppParams = {
  devMode: boolean;
  config: AppConfig;
  initialState: Partial<State>;
};

(async ({ config, devMode, initialState }: AppParams) => {
  const services = new Services();

  const createStore = storeCreator(services, devMode);
  const store = createStore(initialState as State);

  ReactDOM.render(
    <AppConfigProvider config={config}>
      <StoreProvider store={store}>
        <Router>
          <App />
        </Router>
      </StoreProvider>
    </AppConfigProvider>,
    document.getElementById("app-mount-point"),
  );

  configureServiceWorker((error: Error | null) => {
    if (error) {
      services.errorReporter.logError(error);
      throw error;
    }
  });
})({
  devMode: true,
  config: { appName: "" },
  initialState: window._INITIAL_STATE_,
});
