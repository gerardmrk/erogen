import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { Blog, Props } from "./component";

describe("<Blog/>", () => {
  let props: Props;
  let wrapper: ShallowWrapper;

  beforeAll(() => {
    props = {
      routes: [],
    };

    wrapper = shallow(<Blog {...props} />);
  });

  it("renders ok", () => {
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });

  it("has static properties required for a route", () => {
    expect(Blog.chunkName).toBeDefined();
    expect(Blog.i18nNamespace).toBeDefined();
  });
});
