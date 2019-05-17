import * as React from "react";
import { EnhancedNavLink } from "./component";
import { ReactTestRenderer, ReactTestInstance } from "react-test-renderer";
import { createRenderer } from "@client/views/__fixtures__/create-renderer";

const Component = EnhancedNavLink;

describe("<EnhancedNavLink/>", () => {
  let renderer: ReactTestRenderer;
  let component: ReactTestInstance;

  beforeEach(async () => {
    renderer = await createRenderer(<Component appHasUpdates={false} to={"/"} />);
    component = renderer.getInstance() as ReactTestInstance;
  });

  it("renders ok", () => {
    expect(component).toBeDefined();
  });
});
