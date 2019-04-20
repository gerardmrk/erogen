import * as React from "react";
import { shallow } from "enzyme";
import { AuthRoutesWrapper } from "./component";

describe("<AuthRoutesWrapper/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<AuthRoutesWrapper title={"test"} />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
