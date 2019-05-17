import * as React from "react";

import { CopyRight } from "./component";

describe("<CopyRight/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<CopyRight />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
