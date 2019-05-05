import * as React from "react";
import { shallow } from "enzyme";
import { Documentation } from "./component";

describe("<Documentation/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<Documentation />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });

  it("has static properties required for a route", () => {
    expect(Documentation.chunkName).toBeDefined();
    expect(typeof Documentation.chunkName).toEqual("string");

    expect(Documentation.i18nNamespace).toBeDefined();
    expect(typeof Documentation.i18nNamespace).toEqual("string");
  });
});
