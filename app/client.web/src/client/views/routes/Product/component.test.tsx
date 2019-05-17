import * as React from "react";

import { Product } from "./component";

describe("<Product/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<Product />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
