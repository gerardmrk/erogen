import * as React from "react";
import { shallow } from "enzyme";
import { GlobalMessage } from "./component";

describe("<GlobalMessage/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<GlobalMessage />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
