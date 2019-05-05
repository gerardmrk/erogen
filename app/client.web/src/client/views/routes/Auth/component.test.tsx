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
    expect(Auth).toHaveProperty("chunkName");
    expect(Auth).toHaveProperty("i18nNamespace");
  });
});
