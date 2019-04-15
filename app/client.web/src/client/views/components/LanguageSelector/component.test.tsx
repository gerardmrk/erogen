import * as React from "react";
import { shallow } from "enzyme";
import { LanguageSelector } from "./component";

describe("<LanguageSelector/>", () => {
  it("renders ok", async () => {
    const wrapper = await shallow(<LanguageSelector />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
