// Only enable snapshotting when component has stabilised and is not
// expected to undergo much development changes in the future.
const SNAPSHOT_ENABLED = true;

import * as React from "react";
import { ReactTestRenderer, ReactTestInstance } from "react-test-renderer"; // prettier-ignore
import { createRenderer } from "@client/views/__fixtures__/create-renderer";

import { GlobalMessage } from "./component";
import { MessageLevel } from "@client/store/state.ui-message/models";

const Component = GlobalMessage;

describe("<GlobalMessage/>", () => {
  let renderer: ReactTestRenderer;
  let component: ReactTestInstance;

  beforeEach(async () => {
    renderer = await createRenderer()(
      <Component
        hide={() => {}}
        msg={{
          display: true,
          level: MessageLevel.Info,
          header: undefined,
          content: "hello",
          list: [],
          autoDismiss: 500,
        }}
      />,
    );
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
