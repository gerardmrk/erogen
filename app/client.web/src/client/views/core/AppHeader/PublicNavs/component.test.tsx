import * as React from "react";
import { shallow } from "enzyme";
import { PublicNavs } from "./component";

describe("<PublicNavs/>", () => {
  it("renders ok", async () => {
    const wrapper = await shallow(<PublicNavs />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
