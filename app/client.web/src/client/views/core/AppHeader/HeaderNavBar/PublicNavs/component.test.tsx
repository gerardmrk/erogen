import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { PublicNavs } from "./component";

describe("<PublicNavs/>", () => {
  let wrapper: ShallowWrapper;

  beforeAll(() => {
    wrapper = shallow(<PublicNavs />);
  });

  it("renders ok", () => {
    expect(wrapper).toExist();
  });

  // it("displays 'Login' and 'Register' link", () => {
  //   expect(wrapper).toHaveText("Login");
  //   expect(wrapper).toHaveText("Register");
  // });
});
