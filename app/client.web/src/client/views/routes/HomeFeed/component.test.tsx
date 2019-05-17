import * as React from "react";

import { HomeFeed } from "./component";

describe("<HomeFeed/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<HomeFeed />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
