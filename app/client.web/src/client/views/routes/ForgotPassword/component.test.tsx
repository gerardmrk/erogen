import * as React from "react";
import { shallow } from "enzyme";
import { ForgotPassword } from "./component";

describe("<ForgotPassword/>", () => {
  it("renders ok", async () => {
    const wrapper = await shallow(<ForgotPassword />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
