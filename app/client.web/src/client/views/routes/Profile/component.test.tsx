import * as React from "react";
import { shallow } from "enzyme";
import { Profile } from "./component";

describe("<Profile/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<Profile />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });

  it("has static properties required for a route", () => {
    expect(Profile.chunkName).toBeDefined();
    expect(typeof Profile.chunkName).toEqual("string");

    expect(Profile.i18nNamespace).toBeDefined();
    expect(typeof Profile.i18nNamespace).toEqual("string");
  });
});
