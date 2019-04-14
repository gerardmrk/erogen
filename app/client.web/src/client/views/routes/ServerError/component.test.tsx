import * as React from "react";
import { shallow } from "enzyme";
import { ServerError } from "./component";

describe("<ServerError/>", () => {
  it("renders ok", async () => {
    const wrapper = await shallow(<ServerError />);
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
