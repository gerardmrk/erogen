import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { HeaderNavBar, Props } from "./component";

describe("<HeaderNavBar/>", () => {
  let wrapper: ShallowWrapper;

  beforeAll(() => {
    wrapper = shallow(<HeaderNavBar isAuthenticated={false} />);
  });

  it("renders ok", () => {
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });

  describe("isAuthenticated === false", () => {
    let props: Props;
    beforeAll(() => {
      props = { isAuthenticated: false };
    });

    it("renders <PublicNavs/>", () => {
      const wrapper = shallow(<HeaderNavBar {...props} />);
      expect(wrapper).toContainMatchingElement("PublicNavs");
    });
  });

  describe("isAuthenticated === true", () => {
    let props: Props;
    beforeAll(() => {
      props = { isAuthenticated: true };
    });

    it("renders <PrivateNavs/>", () => {
      const wrapper = shallow(<HeaderNavBar {...props} />);
      expect(wrapper).toContainMatchingElement("PrivateNavs");
    });
  });
});
