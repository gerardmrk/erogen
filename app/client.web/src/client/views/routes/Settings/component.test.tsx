import * as React from "react";
import { shallow } from "enzyme";
import { Settings } from "./component";

describe("<Settings/>", () => {
  it("renders ok", async () => {
    const wrapper = await shallow(<Settings />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
