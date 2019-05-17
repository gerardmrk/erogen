import * as React from "react";

import { SettingsProfile } from "./component";

describe("<SettingsProfile/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<SettingsProfile />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
