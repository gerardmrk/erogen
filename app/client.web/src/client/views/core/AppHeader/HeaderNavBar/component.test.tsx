import * as React from "react";
import { shallow } from "enzyme";
import { HeaderNavBar, Props } from "./component";

describe("<HeaderNavBar/>", () => {
  let props: Props;
  beforeAll(() => {
    props = { isAuthenticated: false };
  });

  it("renders ok", async () => {
    const wrapper = await shallow(<HeaderNavBar {...props} />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
