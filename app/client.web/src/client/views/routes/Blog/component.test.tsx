import * as React from "react";
import { withRouter } from "react-router";
import { ReactTestRenderer, ReactTestInstance } from "react-test-renderer"; // prettier-ignore
import { createRenderer } from "@client/views/_fixtures_/create-renderer";

import { Blog } from "./component";
import { withTranslationMock } from "@client/views/_fixtures_/withtranslation-mock";

const Component = withTranslationMock()(withRouter(Blog));

describe("<Blog/>", () => {
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
