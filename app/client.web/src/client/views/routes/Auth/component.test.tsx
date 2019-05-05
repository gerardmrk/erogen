import * as React from "react";
import { shallow } from "enzyme";
import { Auth } from "./component";

describe("<Auth/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<Auth />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });

  it("has static properties required for a route", () => {
    expect(Auth.chunkName).toBeDefined();
    expect(typeof Auth.chunkName).toEqual("string");

    expect(Auth.i18nNamespace).toBeDefined();
    expect(typeof Auth.i18nNamespace).toEqual("string");
  });
});
