import * as React from "react";

import { ServerError } from "./component";

describe("<ServerError/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<ServerError />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
