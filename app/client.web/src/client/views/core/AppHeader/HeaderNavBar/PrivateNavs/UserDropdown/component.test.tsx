// Only enable snapshotting when component has stabilised and is not
// expected to undergo much development changes in the future.
const SNAPSHOT_ENABLED = true;

import * as React from "react";
import { ReactTestRenderer, ReactTestInstance } from "react-test-renderer"; // prettier-ignore
import { createRenderer } from "@client/views/__fixtures__/create-renderer";

import { UserDropdown } from "./component";
import { withRouter } from "react-router";
import { withTranslationMock } from "@client/views/__fixtures__/withtranslation-mock";

const Component = withTranslationMock()(withRouter(UserDropdown));

describe("<UserDropdown/>", () => {
  let renderer: ReactTestRenderer;
  let component: ReactTestInstance;

  beforeEach(async () => {
    renderer = await createRenderer()(
      <Component
      // isLoadingUser={false}
      // profile={{ username: "xoxo", displayPicUrl: undefined }}
      // logout={() => {}}
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
