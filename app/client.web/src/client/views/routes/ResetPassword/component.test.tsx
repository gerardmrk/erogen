import * as React from "react";
import { shallow } from "enzyme";
import { ResetPassword } from "./component";

describe("<ResetPassword/>", () => {
  it("renders ok", async () => {
    const wrapper = await shallow(<ResetPassword />);
    expect(wrapper).toExist();
  });
});
