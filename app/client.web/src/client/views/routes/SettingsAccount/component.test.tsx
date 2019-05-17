import * as React from "react";
import { ReactTestRenderer, ReactTestInstance } from "react-test-renderer"; // prettier-ignore
import { createRenderer } from "@client/views/_fixtures_/create-renderer";

import { SettingsAccount } from "./component";
import { withTranslationMock } from "@client/views/_fixtures_/withTranslationMock";

const Component = withTranslationMock()(SettingsAccount);

describe("<SettingsAccount/>", () => {
  let renderer: ReactTestRenderer;
  let component: ReactTestInstance;

  beforeEach(() => {
    renderer = createRenderer(<Component />);
    component = renderer.getInstance() as ReactTestInstance;
  });

  it("renders ok", () => {
    expect(component).toBeDefined();
  });
});
