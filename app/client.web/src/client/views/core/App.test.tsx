import * as React from "react";
import App from "./App";
import { shallowWithRouter } from "../__test_helpers__/wrappers";

describe("<App />", () => {
  it("renders ok", () => {
    const wrapper = shallowWithRouter(<App />);
    expect(wrapper).toExist();
  });
});
