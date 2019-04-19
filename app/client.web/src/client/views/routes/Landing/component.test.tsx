import * as React from "react";
import { shallow } from "enzyme";
import { Landing } from "./component";

describe("<Landing/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<Landing />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
