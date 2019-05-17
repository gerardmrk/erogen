import * as React from "react";
import { Auth } from "./component";
import { withTranslationMock } from "@client/views/_fixtures_/withTranslationMock";
import { create, ReactTestInstance } from "react-test-renderer";

const Component = withTranslationMock()(Auth);

describe("<Auth/>", () => {
  let component: ReactTestInstance | null;

  beforeEach(() => {
    const renderer = createRenderer(<Component />);
    component = renderer.getInstance();
  });

  it("renders ok", () => {
    expect(component).toBeDefined();
  });
});
