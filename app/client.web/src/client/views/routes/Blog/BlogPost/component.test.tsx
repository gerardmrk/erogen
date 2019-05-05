import * as React from "react";
import { shallow } from "enzyme";
import { BlogPost } from "./component";

describe("<BlogPost/>", () => {
  it("renders ok", () => {
    const wrapper = shallow(<BlogPost />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });

  it("has static properties required for a route", () => {
    expect(BlogPost.chunkName).toBeDefined();
    expect(BlogPost.i18nNamespace).toBeDefined();
  });
});
