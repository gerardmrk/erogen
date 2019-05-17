import * as React from "react";
import { EnhancedNavLink } from "./component";
import { ReactTestRenderer, ReactTestInstance } from "react-test-renderer";
import { createRenderer } from "@client/views/_fixtures_/createRenderer";

const Component = EnhancedNavLink;

describe("<EnhancedNavLink/>", () => {
  let renderer: ReactTestRenderer;
  let component: ReactTestInstance;

  beforeEach(() => {
    renderer = createRenderer(<Component appHasUpdates={false} to={"/"} />);
    component = renderer.getInstance() as ReactTestInstance;
  });

  it("renders ok", () => {
    expect(component).toBeDefined();
  });
});
