import * as React from "react";
import { shallow } from "enzyme";
import { Documentation, Props } from "./component";
import { shallowWithTranslation } from "@client/views/_fixtures_/wrappers";

describe("<Documentation/>", () => {
  it("renders ok", () => {
    const wrapper = shallowWithTranslation<Props>(
      <Documentation guarded={false} />,
    );
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
