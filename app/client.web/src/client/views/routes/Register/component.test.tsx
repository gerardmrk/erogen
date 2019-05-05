import * as React from "react";
import { shallow } from "enzyme";
import { Register } from "./component";

describe("<Register/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<Register />);
    expect(wrapper).toExist();
  });

  it("has static properties required for a route", () => {
    expect(Register).toHaveProperty("chunkName");
    expect(Register).toHaveProperty("i18nNamespace");
  });
});
