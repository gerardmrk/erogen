import * as React from "react";
import { shallow } from "enzyme";
import { Landing } from "./component";

describe("<Landing/>", () => {
  it("renders ok", async () => {
    const wrapper = await shallow(<Landing />);
    expect(wrapper).toExist();
  });
});
