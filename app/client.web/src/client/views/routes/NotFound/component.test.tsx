import * as React from "react";

import { NotFound } from "./component";

describe("<NotFound/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
