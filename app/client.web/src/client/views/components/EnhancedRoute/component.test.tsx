import * as React from "react";
import loadable from "@loadable/component";
import { shallow } from "enzyme";
import { EnhancedRoute, Props } from "./component";

describe("<Container/>", () => {
  let props: Props;

  beforeAll(() => {
    props = {
      isAuthenticated: false,
      title: "obelix",
      guarded: false,
      component: loadable(() => import("@client/views/routes/Landing")),
    };
  });

  it("renders ok", async () => {
    const wrapper = await shallow(<EnhancedRoute {...props} />);
    expect(wrapper).toExist();
  });
});
