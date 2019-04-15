import * as React from "react";
import { shallow } from "enzyme";
import { AppFooter } from "./component";

describe("<AppFooter/>", () => {
  it("renders ok", async () => {
    const wrapper = await shallow(<AppFooter />);
    expect(wrapper).toExist();
  });
});
