import * as React from "react";

import { LanguageSelector } from "./component";

describe("<LanguageSelector/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<LanguageSelector />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
