import * as React from "react";
import { shallow } from "enzyme";
import { Product } from "./component";

describe("<Product/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<Product />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });

  it("has static properties required for a route", () => {
    expect(Product.chunkName).toBeDefined();
    expect(Product.i18nNamespace).toBeDefined();
  });
});
