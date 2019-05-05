import * as React from "react";
import { shallow } from "enzyme";
import { Login } from "./component";

describe("<Login/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper).toExist();
  });

  it("has static properties required for a route", () => {
    expect(Login).toHaveProperty("chunkName");
    expect(Login).toHaveProperty("i18nNamespace");
  });
});
