import * as React from "react";
import { shallow } from "enzyme";
import { AuthNavs } from "./component";

describe("<AuthNavs/>", () => {
  it("renders ok", async () => {
    const wrapper = await shallow(<AuthNavs />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
