import * as React from "react";
import { shallow } from "enzyme";
import { Auth } from "./component";

describe("<Auth/>", () => {
  it("renders ok", async () => {
    const wrapper = await shallow(<Auth />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
