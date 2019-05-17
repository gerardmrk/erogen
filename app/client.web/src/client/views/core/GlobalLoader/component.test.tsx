// Only enable snapshotting when component has stabilised and is not
// expected to undergo much development changes in the future.
const SNAPSHOT_ENABLED = true;

import * as React from "react";
import { ReactTestRenderer, ReactTestInstance } from "react-test-renderer"; // prettier-ignore
import { createRenderer } from "@client/views/_fixtures_/create-renderer";

import { GlobalLoader } from "./component";

const Component = GlobalLoader;

describe("<GlobalLoader/>", () => {
  let renderer: ReactTestRenderer;
  let component: ReactTestInstance;

  beforeEach(() => {
    renderer = createRenderer(
      <Component loading={false} message={"message"} />,
    );
    component = renderer.getInstance() as ReactTestInstance;
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
