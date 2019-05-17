import * as React from "react";
import { create, ReactTestRenderer, ReactTestInstance } from "react-test-renderer"; // prettier-ignore

import { LoginForm } from "./component";
import { withTranslationMock } from "@client/views/_fixtures_/withTranslationMock";

const Component = withTranslationMock()(LoginForm);

describe("<LoginForm/>", () => {
  let renderer: ReactTestRenderer;
  let component: ReactTestInstance;

  beforeEach(() => {
    renderer = create(<Component />);
    component = renderer.getInstance() as ReactTestInstance;
  });

  it("renders ok", () => {
    expect(component).toBeDefined();
  });
});
