import * as React from "react";
import * as ReactDOM from "react-dom";
import { loadableReady } from "@loadable/component";
import { Provider as StoreProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider as HeadProvider } from "react-helmet-async";

import App from "@client/views/core/App";
import { Services } from "@client/services";
import { storeCreator, State } from "@client/store";
import { initI18N } from "@client/main.i18n";
import { initServiceWorker } from "@client/main.offline";
import { I18nProvider } from "@client/views/core/I18nProvider";
import { ConfigProvider } from "@client/views/core/ConfigProvider";

(async function init() {
  /**
   * variables injected at build time.
   */

  const devMode = INJECTED_DEV_MODE;
  const appConfig = INJECTED_APP_CONFIG;
  const publicPath = INJECTED_PUBLIC_PATH;
  const translationsPath = INJECTED_TRANSLATIONS_PATH;
  const untranslatedPath = INJECTED_UNTRANSLATED_PATH;
  const appMountPointID = INJECTED_APP_MOUNT_POINT_ID;

  /**
   * variables from HTML script tag, set by server.
   */

  let ssrMode = window._SSR_MODE_;
  if (ssrMode === undefined || typeof ssrMode !== "boolean") {
    ssrMode = false;
  }

  let initialState = window._INITIAL_STATE_;
  if (initialState === undefined || typeof initialState !== "object") {
    initialState = {};
  }

  try {
    const services = new Services();

    const createStore = storeCreator(services, devMode);
    const store = createStore(initialState as State);

    let render: ReactDOM.Renderer = ReactDOM.render;

    if (!devMode && ssrMode) {
      render = ReactDOM.hydrate;
      await loadableReady();
    }

    const config = {
      devMode,
      ssrMode: ssrMode as boolean,
      app: appConfig,
      publicPath,
      translationsPath,
      untranslatedPath,
    };

    const i18n = await initI18N(config);

    render(
      <ConfigProvider config={config}>
        <I18nProvider i18n={i18n}>
          <StoreProvider store={store}>
            <HeadProvider>
              <Router>
                <App />
              </Router>
            </HeadProvider>
          </StoreProvider>
        </I18nProvider>
      </ConfigProvider>,
      document.getElementById(appMountPointID),
      () => {
        initServiceWorker((error: Error | null) => {
          if (error) {
            services.errors.logError(error);
            throw error;
          }
        });
      },
    );
  } catch (err) {
    console.error(err);
  }
})();
