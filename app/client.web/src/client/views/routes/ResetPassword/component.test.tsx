import * as React from "react";
import { shallow } from "enzyme";
import { ResetPassword } from "./component";

describe("<ResetPassword/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<ResetPassword />);
    expect(wrapper).toExist();
  });

  it("has static properties required for a route", () => {
    expect(ResetPassword).toHaveProperty("chunkName");
    expect(ResetPassword).toHaveProperty("i18nNamespace");
  });
});
