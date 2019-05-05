import * as React from "react";
import { shallow } from "enzyme";
import { ProfileSettings } from "./component";

describe("<ProfileSettings/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<ProfileSettings />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });

  it("has static properties required for a route", () => {
    expect(ProfileSettings.chunkName).toBeDefined();
    expect(typeof ProfileSettings.chunkName).toEqual("string");

    expect(ProfileSettings.i18nNamespace).toBeDefined();
    expect(typeof ProfileSettings.i18nNamespace).toEqual("string");
  });
});
