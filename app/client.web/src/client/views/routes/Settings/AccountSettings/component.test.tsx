import * as React from "react";
import { shallow } from "enzyme";
import { AccountSettings } from "./component";

describe("<AccountSettings/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<AccountSettings />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });

  it("has static properties required for a route", () => {
    expect(AccountSettings.chunkName).toBeDefined();
    expect(AccountSettings.i18nNamespace).toBeDefined();
  });
});
