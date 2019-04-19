import * as React from "react";
import { shallow } from "enzyme";
import { Register } from "./component";

describe("<Register/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<Register />);
    expect(wrapper).toExist();
  });
});
