import * as React from "react";
import { shallow } from "enzyme";
import { SiteMap } from "./component";

describe("<SiteMap/>", () => {
  it("renders ok", async () => {
    const wrapper = await shallow(<SiteMap />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
