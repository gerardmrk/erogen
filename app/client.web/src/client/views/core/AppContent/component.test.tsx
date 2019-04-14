import * as React from "react";
import { shallow } from "enzyme";
import { AppContent } from "./component";

describe("<AppContent/>", () => {
  it("renders ok", async () => {
    const wrapper = await shallow(<AppContent />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
