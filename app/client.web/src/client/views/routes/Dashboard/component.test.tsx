import * as React from "react";
import { ReactTestRenderer, ReactTestInstance } from "react-test-renderer"; // prettier-ignore
import { createRenderer } from "@client/views/_fixtures_/createRenderer";

import { Dashboard } from "./component";
import { withTranslationMock } from "@client/views/_fixtures_/withTranslationMock";

const Component = withTranslationMock()(Dashboard);

describe("<Dashboard/>", () => {
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
