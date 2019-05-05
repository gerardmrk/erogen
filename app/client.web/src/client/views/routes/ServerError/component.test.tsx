import * as React from "react";
import { shallow } from "enzyme";
import { ServerError } from "./component";

describe("<ServerError/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<ServerError />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });

  it("has static properties required for a route", () => {
    expect(ServerError).toHaveProperty("chunkName");
    expect(ServerError).toHaveProperty("i18nNamespace");
  });
});
