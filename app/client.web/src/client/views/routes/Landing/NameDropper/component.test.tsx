import * as React from "react";
import { shallow } from "enzyme";
import { NameDropper } from "./component";

describe("<NameDropper/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<NameDropper />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
