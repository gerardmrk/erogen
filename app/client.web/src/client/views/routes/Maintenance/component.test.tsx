import * as React from "react";
import { shallow } from "enzyme";
import { Maintenance } from "./component";

describe("<Maintenance/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<Maintenance />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });

  it("has static properties required for a route", () => {
    expect(Maintenance.chunkName).toBeDefined();
    expect(Maintenance.i18nNamespace).toBeDefined();
  });
});
