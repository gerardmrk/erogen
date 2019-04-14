import * as React from "react";
import { shallow } from "enzyme";
import { AppHeader } from "./component";

describe("<AppHeader/>", () => {
  it("renders ok", async () => {
    const wrapper = await shallow(<AppHeader />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
