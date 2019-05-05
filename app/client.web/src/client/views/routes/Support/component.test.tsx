import * as React from "react";
import { shallow } from "enzyme";
import { Support } from "./component";

describe("<Support/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<Support />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
