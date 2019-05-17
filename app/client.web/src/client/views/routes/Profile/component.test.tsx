import * as React from "react";

import { Profile } from "./component";

describe("<Profile/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<Profile />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
