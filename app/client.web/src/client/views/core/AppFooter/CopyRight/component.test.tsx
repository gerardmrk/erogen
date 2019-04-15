import * as React from "react";
import { shallow } from "enzyme";
import { CopyRight } from "./component";

describe("<CopyRight/>", () => {
  it("renders ok", async () => {
    const wrapper = await shallow(<CopyRight />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
