import * as React from "react";
import { shallow } from "enzyme";
import { AppFooter } from "./component";

describe("<AppFooter/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<AppFooter />);
    expect(wrapper).toExist();
  });
});
