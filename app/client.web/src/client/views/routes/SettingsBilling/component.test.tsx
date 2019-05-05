import * as React from "react";
import { shallow } from "enzyme";
import { SettingsBilling } from "./component";

describe("<SettingsBilling/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<SettingsBilling />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
