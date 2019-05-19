import { DeepReadonly } from "utility-types";
import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { AuthKeys } from "@client/services/auth";
import { createReducer } from "@client/store/create-reducer";

export type Action = ActionType<typeof actions>;

export type State = DeepReadonly<{
  isAuthenticated: boolean;
  authKeys: AuthKeys | undefined;
}>;

export const defaultState = (): State => ({
  isAuthenticated: false,
  authKeys: undefined,
});

export const reducer = createReducer<State, Action>(defaultState(), {
  ["auth.loginPending"]: (state, action) => {
    return state;
  },

  ["auth.loginSuccess"]: (state, action) => ({
    ...state,
    isAuthenticated: true,
    authKeys: { ...action.payload.authKeys },
  }),

  ["auth.loginFailure"]: (state, action) => ({
    ...state,
  }),

  ["auth.logoutPending"]: (state, action) => {
    return state;
  },

  ["auth.logoutSuccess"]: (state, action) => {
    return defaultState();
  },

  ["auth.logoutFailure"]: (state, action) => {
    return state;
  },
});
