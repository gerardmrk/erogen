import * as React from "react";
import { shallow } from "enzyme";
import { GlobalMessage } from "./component";

describe("<GlobalMessage/>", () => {
  it("renders ok", async () => {
    const wrapper = await shallow(<GlobalMessage />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
