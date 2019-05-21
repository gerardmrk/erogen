import { reducer, defaultState, State, Action } from ".";
import * as actions from "./actions";

const state = (changes: Partial<State>): State => ({
  ...defaultState(),
  ...changes,
});

// prettier-ignore
describe("store/auth/state", () => {
  test("default state", () => {
    const next = reducer(undefined, {} as any);
    expect(next).toEqual(defaultState());
    expect(next.authKeys).not.toBeDefined();
    expect(next.error).not.toBeDefined();
    expect(next.isResolving).toBe(false);
    expect(next.isAuthenticated).toBe(false);
  });

  test("invalid actions", () => {
    expect(reducer(undefined, {} as any)).toEqual(defaultState());
    expect(reducer(undefined, { type: "" } as any)).toEqual(defaultState());
    expect(reducer(undefined, { type: "-x-o" } as any)).toEqual(defaultState());
  });

  test.each<[Action, Partial<State>, Partial<State>]>([
    [
      actions.loginPending({}),
      {
        isResolving: false,
        isAuthenticated: true,
        error: { code: "port au prince", message: "port of spain" },
      },
      {
        isResolving: true,
        error: undefined,
        isAuthenticated: true,
      }
    ],
    [
      actions.loginSuccess({ accessToken: "uruguay", refreshToken: "paraguay" }, {}),
      {
        isResolving: true
      },
      {
        isResolving: false,
        isAuthenticated: true,
        error: undefined,
        authKeys: { accessToken: "uruguay", refreshToken: "paraguay" },
      },
    ],
    [
      actions.loginFailure({ message: "bahamas" }, {}),
      {
        isResolving: true,
        isAuthenticated: true,
      },
      {
        isResolving: false,
        isAuthenticated: true,
        error: { message: "bahamas" },
      },
    ],
    [
      actions.logoutPending({}),
      {
        isAuthenticated: true,
        error: { code: "grenada", message: "costa rica" },
      },
      {
        isAuthenticated: true,
        isResolving: true,
        error: undefined,
      },
    ],
    [
      actions.logoutSuccess({}),
      {
        isAuthenticated: true,
        isResolving: true,
        authKeys: { accessToken: "antigua" },
      },
      {
        isAuthenticated: false,
        isResolving: false,
        authKeys: undefined,
      },
    ],
    [
      actions.logoutFailure({ code: "cuba", message: "panama" }, {}),
      {
        isAuthenticated: true,
        isResolving: true,
      },
      {
        isAuthenticated: true,
        isResolving: false,
        error: { code: "cuba", message: "panama" },
      },
    ],
  ])('A(%o): S(%o) -> S(%o)', (action, prevState, nextState) => {
    expect(reducer(state(prevState), action)).toEqual(state(nextState));
  });
});
