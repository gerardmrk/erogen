import * as React from "react";
import { shallow } from "enzyme";
import { BillingSettings } from "./component";

describe("<BillingSettings/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<BillingSettings />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
