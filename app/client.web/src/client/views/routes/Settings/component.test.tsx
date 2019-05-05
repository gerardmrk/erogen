import * as React from "react";
import { shallow } from "enzyme";
import { Settings } from "./component";

describe("<Settings/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<Settings />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });

  it("has static properties required for a route", () => {
    expect(Settings.chunkName).toBeDefined();
    expect(Settings.i18nNamespace).toBeDefined();
  });
});
