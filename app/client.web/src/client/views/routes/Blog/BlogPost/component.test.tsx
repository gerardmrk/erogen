import * as React from "react";
import { shallow } from "enzyme";
import { BlogPost } from "./component";

describe("<BlogPost/>", () => {
  it("renders ok", async () => {
    const wrapper = await shallow(<BlogPost />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
