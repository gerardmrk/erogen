import * as React from "react";
import { shallow } from "enzyme";
import { LoginForm } from "./component";

describe("<LoginForm/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper).toExist();
  });
});
