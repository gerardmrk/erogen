import * as React from "react";
import { shallow } from "enzyme";
import { Login } from "./component";

describe("<Login/>", () => {
  it("renders ok", async () => {
    const wrapper = await shallow(<Login />);
    expect(wrapper).toExist();
  });
});
