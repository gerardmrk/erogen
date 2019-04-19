import * as React from "react";
import { shallow } from "enzyme";
import { SiteMap } from "./component";

describe("<SiteMap/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<SiteMap />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
