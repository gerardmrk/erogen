import * as React from "react";
import { ReactTestRenderer, ReactTestInstance } from "react-test-renderer"; // prettier-ignore
import { createRenderer } from "@client/views/_fixtures_/createRenderer";

import { AppContent } from "./component";
import { MemoryRouter, withRouter } from "react-router";

const Component = withRouter(AppContent);

describe("<AppContent/>", () => {
  let renderer: ReactTestRenderer;
  let component: ReactTestInstance;

  beforeEach(() => {
    renderer = createRenderer(
      <MemoryRouter>
        <Component />
      </MemoryRouter>,
    );
    component = renderer.getInstance() as ReactTestInstance;
  });

  it("renders ok", () => {
    expect(component).toBeDefined();
  });
});
