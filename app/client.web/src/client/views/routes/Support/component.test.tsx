import * as React from "react";
import { ReactTestRenderer, ReactTestInstance } from "react-test-renderer"; // prettier-ignore
import { createRenderer } from "@client/views/__fixtures__/create-renderer";

import { Support } from "./component";
import { withTranslationMock } from "@client/views/__fixtures__/withtranslation-mock";

const Component = withTranslationMock()(Support);

describe("<Support/>", () => {
  let renderer: ReactTestRenderer;
  let component: ReactTestInstance;

  beforeEach(() => {
    renderer = createRenderer(<Component />);
    component = renderer.getInstance() as ReactTestInstance;
  });

  it("renders ok", () => {
    expect(component).toBeDefined();
  });
});
