import * as React from "react";
import { shallow } from "enzyme";
import { HomeFeed } from "./component";

describe("<HomeFeed/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<HomeFeed />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });

  it("has static properties required for a route", () => {
    expect(HomeFeed).toHaveProperty("chunkName");
    expect(HomeFeed).toHaveProperty("i18nNamespace");
  });
});
