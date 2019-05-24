// Only enable snapshotting when component has stabilised and is not
// expected to undergo much development changes in the future.
const SNAPSHOT_ENABLED = true;

import * as React from "react";
import { ReactTestRenderer, ReactTestInstance } from "react-test-renderer"; // prettier-ignore
import { createRenderer } from "@client/views/__fixtures__/create-renderer";

import { LanguageSelector } from "./component";
import { withConfig } from "@client/views/core/ConfigProvider";
import { withTranslation } from "@client/views/core/I18nProvider";

const Component = withTranslation()(withConfig(LanguageSelector));

describe("<LanguageSelector/>", () => {
  let renderer: ReactTestRenderer;
  let component: ReactTestInstance;

  beforeEach(async () => {
    renderer = await createRenderer()(<Component />);
    component = renderer.getInstance() as ReactTestInstance;
    await (component as any).componentDidMount();
  });

  if (SNAPSHOT_ENABLED) {
    test("snapshot", () => {
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  }

  it("renders ok", () => {
    expect(component).toBeDefined();
  });
});
