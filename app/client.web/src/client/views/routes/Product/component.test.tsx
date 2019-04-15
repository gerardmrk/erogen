import * as React from "react";
import { shallow } from "enzyme";
import { Product } from "./component";

describe("<Product/>", () => {
  it("renders ok", async () => {
    const wrapper = await shallow(<Product />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
