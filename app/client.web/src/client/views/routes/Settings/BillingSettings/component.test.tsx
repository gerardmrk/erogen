import * as React from "react";
import { shallow } from "enzyme";
import { BillingSettings } from "./component";

describe("<BillingSettings/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<BillingSettings />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });

  it("has static properties required for a route", () => {
    expect(BillingSettings).toHaveProperty("chunkName");
    expect(BillingSettings).toHaveProperty("i18nNamespace");
  });
});
