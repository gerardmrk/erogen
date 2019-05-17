// Only enable snapshotting when component has stabilised and is not
// expected to undergo much development changes in the future.
const SNAPSHOT_ENABLED = true;

import * as React from "react";
import { ReactTestRenderer, ReactTestInstance } from "react-test-renderer";
import { createRenderer } from "@client/views/_fixtures_/create-renderer";
import { EnhancedRoute } from "./component";
import { mockAsyncRoute } from "@client/views/_fixtures_/mock-async-route";

const Component = EnhancedRoute;

describe("<EnhancedRoute/>", () => {
  let renderer: ReactTestRenderer;
  let component: ReactTestInstance;

  beforeEach(async () => {
    renderer = await createRenderer(
      <Component isAuthenticated={true} {...mockAsyncRoute} />,
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
