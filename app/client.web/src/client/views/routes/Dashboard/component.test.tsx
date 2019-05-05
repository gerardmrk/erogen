import * as React from "react";
import { shallow } from "enzyme";
import { Dashboard } from "./component";

describe("<Dashboard/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });

  it("has static properties required for a route", () => {
    expect(Dashboard.chunkName).toBeDefined();
    expect(typeof Dashboard.chunkName).toEqual("string");

    expect(Dashboard.i18nNamespace).toBeDefined();
    expect(typeof Dashboard.i18nNamespace).toEqual("string");
  });
});
