import { Action } from "@client/store";
import { MockServices } from "@client/services/svc.mock";
import { login } from "./async.login";
import { MessageLevel } from "../state.ui-message/models";

describe("store/auth/action.login", () => {
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
    services.auth.returnFor("login", {
      code: 200,
      success: true,
      mfaRequired: false,
      authKeys: { accessToken: "kigali" },
    });

    const asyncDispatch = login("huacachina", "tajikistan", false);
    await asyncDispatch(dispatch, getState, services);

    expect(services.auth.recorded("login").count).toBe(1);

    expect(dispatched[0]).toEqual({
      type: "auth.loginPending",
      meta: { loader: "messages.logging-in" },
    });

    expect(dispatched[1]).toEqual({
      type: "auth.loginSuccess",
      payload: {
        authKeys: {
          accessToken: "kigali",
        },
      },
      meta: {
        loader: false,
        message: {
          level: MessageLevel.Success,
          header: "messages.login-success.header",
          content: "messages.login-success.message",
          autoDismiss: 1000,
        },
      },
    });
  });

  test("failure flow", async () => {
    const err = new Error("conakry");
    services.auth.throwFor("login", err);

    const asyncDispatch = login("moldova", "andorra la vella", true);
    await asyncDispatch(dispatch, getState, services);

    expect(services.auth.recorded("login").count).toBe(1);

    expect(dispatched[0]).toEqual({
      type: "auth.loginPending",
      meta: { loader: "messages.logging-in" },
    });

    expect(dispatched[1]).toEqual({
      type: "auth.loginFailure",
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
