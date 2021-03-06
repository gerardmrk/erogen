// Only enable snapshotting when component has stabilised and is not
// expected to undergo much development changes in the future.
const SNAPSHOT_ENABLED = true;

import * as React from "react";
import { Auth } from "./component";
import { withTranslationMock } from "@client/views/__fixtures__/withtranslation-mock";
import { ReactTestInstance, ReactTestRenderer } from "react-test-renderer";
import { createRenderer } from "@client/views/__fixtures__/create-renderer";

const Component = withTranslationMock()(Auth);

describe("<Auth/>", () => {
  let renderer: ReactTestRenderer;
  let component: ReactTestInstance | null;

  beforeEach(async () => {
    renderer = await createRenderer()(<Component />);
    component = renderer.getInstance();
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
