import * as React from "react";
import { shallow } from "enzyme";
import { Login } from "./component";

describe("<Login/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper).toExist();
  });

  it("has static properties required for a route", () => {
    expect(Login.chunkName).toBeDefined();
    expect(Login.i18nNamespace).toBeDefined();
  });
});
