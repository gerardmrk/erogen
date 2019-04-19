import * as React from "react";
import { shallow } from "enzyme";
import { Container } from "./component";

describe("<Container/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<Container />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
