import * as React from "react";
import { shallow } from "enzyme";
import { Register } from "./component";

describe("<Register/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<Register />);
    expect(wrapper).toExist();
  });

  it("has static properties required for a route", () => {
    expect(Register.chunkName).toBeDefined();
    expect(typeof Register.chunkName).toEqual("string");

    expect(Register.i18nNamespace).toBeDefined();
    expect(typeof Register.i18nNamespace).toEqual("string");
  });
});
