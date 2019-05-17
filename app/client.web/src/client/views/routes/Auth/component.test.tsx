import * as React from "react";
import { Auth } from "./component";
import { withTranslationMock } from "@client/views/_fixtures_/wrapper";
import { create, ReactTestInstance } from "react-test-renderer";

const Component = withTranslationMock()(Auth);

describe("<Auth/>", () => {
  let component: ReactTestInstance | null;

  beforeEach(() => {
    const renderer = create(<Component />);
    component = renderer.getInstance();
  });

  it("renders ok", () => {
    expect(component).toExist();
    expect(component).toHaveClassName("main");
  });
});
