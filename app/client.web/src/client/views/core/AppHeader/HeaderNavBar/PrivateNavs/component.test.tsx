import * as React from "react";

import { PrivateNavs } from "./component";

describe("<PrivateNavs/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<PrivateNavs />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
