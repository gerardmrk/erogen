import * as React from "react";
import { ForgotPassword } from "./component";
import { shallowWithTranslation } from "@client/views/_fixtures_/wrappers";

describe("<ForgotPassword/>", () => {
  it("renders ok", () => {
    const wrapper = shallowWithTranslation(
      <ForgotPassword guarded={false} t={msg => msg as any} />,
    );
    expect(wrapper).toExist();
  });
});
