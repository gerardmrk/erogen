import * as React from "react";
import { shallow } from "enzyme";
import { Dashboard } from "./component";

describe("<Dashboard/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
