import * as React from "react";
import { shallow } from "enzyme";
import { Support } from "./component";

describe("<Support/>", () => {
  it("renders ok", async () => {
    const wrapper = await shallow(<Support />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
