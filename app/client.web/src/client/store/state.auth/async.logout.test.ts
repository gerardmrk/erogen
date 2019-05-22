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

  afterEach(() => {
    services.resetAll();
    dispatched = [];
  });

  test("success flow", async () => {
    const asyncDispatch = logout();
    await asyncDispatch(dispatch, getState, services);

    expect(services.auth.recorded("logout").count).toBe(1);

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

  test("failure flow", async () => {
    const err = new Error("reykjavik");
    services.auth.throwFor("logout", err);

    const asyncDispatch = logout();
    await asyncDispatch(dispatch, getState, services);

    expect(services.auth.recorded("logout").count).toBe(1);

    expect(dispatched[0]).toEqual({
      type: "auth.logoutPending",
      meta: { loader: "Logging out..." },
    });

    expect(dispatched[1]).toEqual({
      type: "auth.logoutFailure",
      payload: {
        message: err.message,
      },
      meta: {
        error: err,
        loader: false,
        message: {
          level: MessageLevel.Error,
          content: err.message,
        },
      },
    });
  });
});
