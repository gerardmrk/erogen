import * as React from "react";

import { Maintenance } from "./component";

describe("<Maintenance/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<Maintenance />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
