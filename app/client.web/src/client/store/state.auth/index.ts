import { DeepReadonly } from "utility-types";
import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { AuthKeys } from "@client/services/auth";
import { createReducer } from "@client/store/create-reducer";

export type Action = ActionType<typeof actions>;

export type State = DeepReadonly<{
  isResolving: boolean;
  isAuthenticated: boolean;
  authKeys: AuthKeys | undefined;
  error: { code?: string; message: string } | undefined;
}>;

export const defaultState = (): State => ({
  isResolving: false,
  isAuthenticated: false,
  authKeys: undefined,
  error: undefined,
});

export const reducer = createReducer<State, Action>(defaultState(), {
  ["auth.loginPending"]: (state, action) => ({
    ...state,
    error: undefined,
    isResolving: true,
  }),

  ["auth.loginSuccess"]: (state, action) => ({
    ...state,
    isResolving: false,
    isAuthenticated: true,
    authKeys: { ...action.payload.authKeys },
  }),

  ["auth.loginFailure"]: (state, action) => ({
    ...state,
    isResolving: false,
    error: {
      ...action.payload,
    },
  }),

  ["auth.logoutPending"]: (state, action) => ({
    ...state,
    error: undefined,
    isResolving: true,
  }),

  ["auth.logoutSuccess"]: (state, action) => ({
    ...state,
    isResolving: false,
    isAuthenticated: false,
    authKeys: undefined,
  }),

  ["auth.logoutFailure"]: (state, action) => ({
    ...state,
    isResolving: false,
    error: {
      ...action.payload,
    },
  }),
});
