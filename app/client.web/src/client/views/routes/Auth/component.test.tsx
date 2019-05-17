import * as React from "react";
import { Auth } from "./component";
import { withTranslationMock } from "@client/views/_fixtures_/withTranslationMock";
import { ReactTestInstance, ReactTestRenderer } from "react-test-renderer";
import { createRenderer } from "@client/views/_fixtures_/create-renderer";

const Component = withTranslationMock()(Auth);

describe("<Auth/>", () => {
  let renderer: ReactTestRenderer;
  let component: ReactTestInstance | null;

  beforeEach(() => {
    renderer = createRenderer(<Component />);
    component = renderer.getInstance();
  });

  it("renders ok", () => {
    expect(component).toBeDefined();
  });
});
