import * as React from "react";
import { shallow } from "enzyme";
import { HomeFeed } from "./component";

describe("<HomeFeed/>", () => {
  it("renders ok", async () => {
    const wrapper = await shallow(<HomeFeed />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
