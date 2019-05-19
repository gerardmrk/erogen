import * as React from "react";
import { create } from "react-test-renderer";
import { MemoryRouter as Router } from "react-router";
import { Provider as StoreProvider } from "react-redux";
import { HelmetProvider as HeadProvider } from "react-helmet-async";
import { storeCreator } from "@client/store";
import { MockServices } from "@client/services/svc.mock";

// instruct react-helmet to account for non-DOM environment.
(HeadProvider as any).canUseDOM = false;

// prettier-ignore
export const createRenderer = (services: MockServices = new MockServices()) => async (elm: React.ReactElement) => {
  const store = storeCreator(services, true)();

  return create(
    <StoreProvider store={store}>
      <HeadProvider>
        <Router>{React.cloneElement(elm)}</Router>
      </HeadProvider>
    </StoreProvider>,
  );
};
