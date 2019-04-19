import * as React from "react";
import { shallow } from "enzyme";
import { GlobalLoader } from "./component";

describe("<GlobalLoader/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<GlobalLoader />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
