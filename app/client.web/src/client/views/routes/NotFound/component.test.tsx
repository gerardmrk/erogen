import * as React from "react";
import { shallow } from "enzyme";
import { NotFound } from "./component";

describe("<NotFound/>", () => {
  it("renders ok", async () => {
    const wrapper = await shallow(<NotFound />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
