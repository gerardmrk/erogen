import * as React from "react";
import { create } from "react-test-renderer";
import { MemoryRouter as Router } from "react-router";
import { Provider as StoreProvider } from "react-redux";
import { HelmetProvider as HeadProvider } from "react-helmet-async";
import { storeCreator } from "@client/store";
import { Services } from "@client/services";

// instruct react-helmet to account for non-DOM environment.
(HeadProvider as any).canUseDOM = false;

export const createRenderer = (elm: React.ReactElement) => {
  const store = storeCreator(new Services(), true)();

  return create(
    <StoreProvider store={store}>
      <HeadProvider>
        <Router>{React.cloneElement(elm)}</Router>
      </HeadProvider>
    </StoreProvider>,
  );
};
