import * as React from "react";
import App from "./App";

describe("<App />", () => {
  it("renders ok", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toExist();
  });
});
