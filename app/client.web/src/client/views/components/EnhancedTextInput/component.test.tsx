import * as React from "react";
import { EnhancedInput } from "./component";
import { ReactTestRenderer, ReactTestInstance } from "react-test-renderer";
import { createRenderer } from "@client/views/__fixtures__/create-renderer";

const Component = EnhancedInput;

describe("<EnhancedInput/>", () => {
  let renderer: ReactTestRenderer;
  let component: ReactTestInstance;

  beforeEach(async () => {
    renderer = await createRenderer()(<Component />);
    component = renderer.getInstance() as ReactTestInstance;
    await (component as any).componentDidMount();
  });

  it("renders ok", () => {
    expect(component).toBeDefined();
  });
});
