import * as React from "react";
import { shallow } from "enzyme";
import { PrivateNavs } from "./component";

describe("<PrivateNavs/>", () => {
  it("renders ok", async () => {
    const wrapper = await shallow(<PrivateNavs />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
