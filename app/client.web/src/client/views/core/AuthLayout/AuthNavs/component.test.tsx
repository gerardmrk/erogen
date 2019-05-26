// Only enable snapshotting when component has stabilised and is not
// expected to undergo much development changes in the future.
const SNAPSHOT_ENABLED = true;

import * as React from "react";
import { ReactTestRenderer, ReactTestInstance } from "react-test-renderer"; // prettier-ignore
import { createRenderer } from "@client/views/__fixtures__/create-renderer";

import { AuthNavs } from "./component";

const Component = AuthNavs;

describe("<AuthNavs/>", () => {
  let renderer: ReactTestRenderer;
  let component: ReactTestInstance;

  beforeEach(async () => {
    renderer = await createRenderer()(<Component />);
    component = renderer.getInstance() as ReactTestInstance;
    await (component as any).componentDidMount();});

  if (SNAPSHOT_ENABLED) {
    test("snapshot", () => {
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  }

  it("renders ok", () => {
    expect(component).toBeDefined();
  });
});
