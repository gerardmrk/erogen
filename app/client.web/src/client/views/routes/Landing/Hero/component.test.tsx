import * as React from "react";
import { shallow } from "enzyme";
import { Hero } from "./component";

describe("<Hero/>", () => {
  it("renders ok", async () => {
    const wrapper = await shallow(<Hero />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
