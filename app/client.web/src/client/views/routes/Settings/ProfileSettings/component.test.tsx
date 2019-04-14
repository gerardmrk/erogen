import * as React from "react";
import { shallow } from "enzyme";
import { ProfileSettings } from "./component";

describe("<ProfileSettings/>", () => {
  it("renders ok", async () => {
    const wrapper = await shallow(<ProfileSettings />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
