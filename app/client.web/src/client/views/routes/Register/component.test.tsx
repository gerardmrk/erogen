import * as React from "react";

import { Register } from "./component";

describe("<Register/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<Register />);
    expect(wrapper).toExist();
  });
});
