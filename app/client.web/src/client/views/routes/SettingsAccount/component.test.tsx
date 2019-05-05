import * as React from "react";
import { shallow } from "enzyme";
import { SettingsAccount } from "./component";

describe("<SettingsAccount/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<SettingsAccount />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
