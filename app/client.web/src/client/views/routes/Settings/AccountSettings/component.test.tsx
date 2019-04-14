import * as React from "react";
import { shallow } from "enzyme";
import { AccountSettings } from "./component";

describe("<AccountSettings/>", () => {
  it("renders ok", async () => {
    const wrapper = await shallow(<AccountSettings />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
