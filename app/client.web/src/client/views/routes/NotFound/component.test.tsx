import * as React from "react";
import { shallow } from "enzyme";
import { NotFound } from "./component";

describe("<NotFound/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });

  it("has static properties required for a route", () => {
    expect(NotFound.chunkName).toBeDefined();
    expect(typeof NotFound.chunkName).toEqual("string");

    expect(NotFound.i18nNamespace).toBeDefined();
    expect(typeof NotFound.i18nNamespace).toEqual("string");
  });
});
