import * as React from "react";

import { SettingsBilling } from "./component";

describe("<SettingsBilling/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<SettingsBilling />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
