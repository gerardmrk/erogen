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
    expect(Dashboard).toHaveProperty("chunkName");
    expect(Dashboard).toHaveProperty("i18nNamespace");
  });
});
