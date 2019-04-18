import * as React from "react";
import { shallow } from "enzyme";
import { Logo } from "./component";

describe("<Logo/>", () => {
  it("renders ok", async () => {
    const wrapper = await shallow(<Logo />);
    expect(wrapper).toExist();
  });
});
