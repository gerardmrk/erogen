import * as React from "react";

import { Login } from "./component";

describe("<Login/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper).toExist();
  });
});
