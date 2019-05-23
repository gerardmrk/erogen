import { reducer, defaultState, State, Action } from ".";
import * as actions from "./actions";

const state = (changes: Partial<State>): State => ({
  ...defaultState(),
  ...changes,
});

// prettier-ignore
describe("store/auth/actions", () => {
  test.each<[Action, Partial<State>, Partial<State>]>([
    [
      actions.loginPending({}),
      {
        isLoading: false,
        isAuthenticated: true,
        error: { code: "port au prince", message: "port of spain" },
      },
      {
        isLoading: true,
        error: undefined,
        isAuthenticated: true,
      }
    ],
    [
      actions.loginSuccess({ accessToken: "uruguay", refreshToken: "paraguay" }, {}),
      {
        isLoading: true
      },
      {
        isLoading: false,
        isAuthenticated: true,
        error: undefined,
        authKeys: { accessToken: "uruguay", refreshToken: "paraguay" },
      },
    ],
    [
      actions.loginFailure({ message: "bahamas" }, {}),
      {
        isLoading: true,
        isAuthenticated: true,
      },
      {
        isLoading: false,
        isAuthenticated: true,
        error: { actionType: "auth.loginFailure", message: "bahamas" },
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
        isLoading: true,
        error: undefined,
      },
    ],
    [
      actions.logoutSuccess({}),
      {
        isAuthenticated: true,
        isLoading: true,
        authKeys: { accessToken: "antigua" },
      },
      {
        isAuthenticated: false,
        isLoading: false,
        authKeys: undefined,
      },
    ],
    [
      actions.logoutFailure({ code: "cuba", message: "panama" }, {}),
      {
        isAuthenticated: true,
        isLoading: true,
      },
      {
        isAuthenticated: true,
        isLoading: false,
        error: { actionType: "auth.logoutFailure", code: "cuba", message: "panama" },
      },
    ],
  ])('A(%o): S(%o) -> S(%o)', (action, prevState, nextState) => {
    expect(reducer(state(prevState), action)).toEqual(state(nextState));
  });
})
