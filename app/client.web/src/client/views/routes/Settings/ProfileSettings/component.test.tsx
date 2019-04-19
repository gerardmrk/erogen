import * as React from "react";
import { shallow } from "enzyme";
import { ProfileSettings } from "./component";

describe("<ProfileSettings/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<ProfileSettings />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
