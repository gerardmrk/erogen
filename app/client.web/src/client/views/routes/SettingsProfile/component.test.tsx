import * as React from "react";
import { shallow } from "enzyme";
import { SettingsProfile } from "./component";

describe("<SettingsProfile/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<SettingsProfile />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
