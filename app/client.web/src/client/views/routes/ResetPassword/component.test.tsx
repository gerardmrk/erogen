import * as React from "react";
import { shallow } from "enzyme";
import { ResetPassword } from "./component";

describe("<ResetPassword/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<ResetPassword />);
    expect(wrapper).toExist();
  });

  it("has static properties required for a route", () => {
    expect(ResetPassword.chunkName).toBeDefined();
    expect(typeof ResetPassword.chunkName).toEqual("string");

    expect(ResetPassword.i18nNamespace).toBeDefined();
    expect(typeof ResetPassword.i18nNamespace).toEqual("string");
  });
});
