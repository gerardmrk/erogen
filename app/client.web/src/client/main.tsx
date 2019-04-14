import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider as StoreProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { Services } from "@client/services";
import { storeCreator, State } from "./store";
import App from "./views/App";
import { configureServiceWorker } from "./offline";

const MOUNT_POINT_ID = "app-container";

const devMode = true;

const services = new Services();
const createStore = storeCreator(services, devMode);

(async () => {
  const initialState = window._INITIAL_STATE_;

  const store = createStore(initialState as State);

  ReactDOM.render(
    <StoreProvider store={store}>
      <Router>
        <App />
      </Router>
    </StoreProvider>,
    document.getElementById(MOUNT_POINT_ID),
  );

  configureServiceWorker((error: Error | null) => {
    if (error) {
      services.errorReporter.logError(error);
      throw error;
    }
  });
})();
