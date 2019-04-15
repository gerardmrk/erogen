import * as React from "react";
import { shallow } from "enzyme";
import { Documentation } from "./component";

describe("<Documentation/>", () => {
  it("renders ok", async () => {
    const wrapper = await shallow(<Documentation />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
