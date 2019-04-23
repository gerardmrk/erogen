import * as React from "react";
import App from "./App";
import { shallow } from "enzyme";

describe("<App />", () => {
  it("renders ok", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toExist();
  });
});
