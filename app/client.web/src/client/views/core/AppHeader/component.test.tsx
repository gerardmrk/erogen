import * as React from "react";
import { shallow } from "enzyme";
import { AppHeader, Props } from "./component";

describe("<AppHeader/>", () => {
  describe("isAuthenticated === true", () => {
    let props: Props;
    beforeAll(() => {
      props = { isAuthenticated: true };
    });

    it("renders ok", () => {
      const wrapper = shallow(<AppHeader {...props} />);
      expect(wrapper).toExist();
    });
  });

  describe("isAuthenticated === false", () => {
    let props: Props;
    beforeAll(() => {
      props = { isAuthenticated: false };
    });

    it("renders ok", () => {
      const wrapper = shallow(<AppHeader {...props} />);
      expect(wrapper).toExist();
    });
  });
});
