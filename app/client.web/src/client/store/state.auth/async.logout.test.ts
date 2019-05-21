import { Action } from "@client/store";
import { MockServices } from "@client/services/svc.mock";
import { logout } from "./async.logout";
import { MessageLevel } from "../state.ui-message/models";

// import { logout } from "./async.logout";

describe("store/auth/action.logout", () => {
  let dispatch;
  let getState;
  let services: MockServices;

  let dispatched: Action[] = [];

  beforeAll(() => {
    dispatch = (action: Action) => (dispatched.push(action), action);
    getState = () => ({});
    services = new MockServices();
  });

  beforeEach(async () => {
    const asyncDispatch = logout();
    await asyncDispatch(dispatch, getState, services);
  });

  afterEach(() => {
    services.resetAll();
    dispatched = [];
  });

  test("dispatched actions", async () => {
    expect(dispatched[0]).toEqual({
      type: "auth.logoutPending",
      meta: { loader: "Logging out..." },
    });

    expect(dispatched[1]).toEqual({
      type: "auth.logoutSuccess",
      meta: {
        loader: false,
        message: {
          level: MessageLevel.Info,
          content: "You've been logged out.",
          autoDismiss: 800,
        },
      },
    });
  });

  test("called services", () => {
    expect(services.auth.recorded.get("logout")).toBeDefined();
  });
});
