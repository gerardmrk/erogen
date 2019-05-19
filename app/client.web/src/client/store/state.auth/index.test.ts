import { reducer, defaultState, State } from ".";
import * as actions from "./actions";

const state = (changes: Partial<State>) => ({
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

  test("auth.loginPending", () => {
    const old = state({
      isResolving: false,
      isAuthenticated: true,
      error: { code: "401", message: "wow" },
    });

    expect(reducer(old, actions.loginPending({}))).toEqual(state({
      isResolving: true,
      error: undefined,
      isAuthenticated: true,
    }));
  });

  test("auth.loginSuccess", () => {
    const old = state({ isResolving: true });

    expect(reducer(old, actions.loginSuccess({ accessToken: "at", refreshToken: "rt" }, {}))).toEqual(state({
      isResolving: false,
      isAuthenticated: true,
      error: undefined,
      authKeys: { accessToken: "at", refreshToken: "rt" },
    }));
  });

  test("auth.loginFailure", () => {
    const old = state({
      isResolving: true,
      isAuthenticated: true,
    });

    expect(reducer(old, actions.loginFailure({ message: "bahamas" }, {}))).toEqual(state({
      isResolving: false,
      isAuthenticated: true,
      error: { message: "bahamas" },
    }));
  });

  test("auth.logoutPending", () => {
    const old = state({
      isAuthenticated: true,
      error: { code: "grenada", message: "costa rica" },
    });

    expect(reducer(old, actions.logoutPending({}))).toEqual(state({
      isAuthenticated: true,
      isResolving: true,
      error: undefined,
    }));
  });

  test("auth.logoutSuccess", () => {
    const old = state({
      isAuthenticated: true,
      isResolving: true,
      authKeys: { accessToken: "antigua" },
    });

    expect(reducer(old, actions.logoutSuccess({}))).toEqual(state({
      isAuthenticated: false,
      isResolving: false,
      authKeys: undefined,
    }));
  });

  test("auth.logoutFailure", () => {
    const old = state({
      isAuthenticated: true,
      isResolving: true,
    });

    expect(reducer(old, actions.logoutFailure({ code: "cuba", message: "panama" }, {}))).toEqual(state({
      isAuthenticated: true,
      isResolving: false,
      error: { code: "cuba", message: "panama" },
    }));
  });
});
