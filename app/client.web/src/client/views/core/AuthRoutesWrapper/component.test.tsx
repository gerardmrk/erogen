import * as React from "react";
import { shallow } from "enzyme";
import { AuthRoutesWrapper } from "./component";

describe("<AuthRoutesWrapper/>", () => {
  it("renders ok", async () => {
    const wrapper = await shallow(<AuthRoutesWrapper />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
