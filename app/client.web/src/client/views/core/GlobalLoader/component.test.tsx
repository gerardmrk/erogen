import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { GlobalLoader } from "./component";

describe("<GlobalLoader/>", () => {
  let wrapper: ShallowWrapper;

  beforeAll(() => {
    wrapper = shallow(<GlobalLoader loading={true} message={""} />);
  });

  it("renders ok", () => {
    expect(wrapper).toExist();
    expect(wrapper).toHaveClassName("main");
  });
});
