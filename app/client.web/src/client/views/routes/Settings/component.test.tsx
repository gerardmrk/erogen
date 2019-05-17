import * as React from "react";

import { Settings } from "./component";

describe("<Settings/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<Settings />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
