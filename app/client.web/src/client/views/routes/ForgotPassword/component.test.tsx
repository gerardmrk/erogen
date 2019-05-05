import * as React from "react";
import { shallow } from "enzyme";
import { ForgotPassword } from "./component";

describe("<ForgotPassword/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<ForgotPassword />);
    expect(wrapper).toExist();
  });

  it("has static properties required for a route", () => {
    expect(ForgotPassword.chunkName).toBeDefined();
    expect(ForgotPassword.i18nNamespace).toBeDefined();
  });
});
