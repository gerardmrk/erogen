import * as React from "react";
import { shallow } from "enzyme";
import { SocialLinks } from "./component";

describe("<SocialLinks/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<SocialLinks />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
