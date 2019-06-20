import { DeepReadonly } from "utility-types";
import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { createReducer } from "@client/store/create-reducer";
import { AuthKeys } from "@client/services/auth";
import { AsyncState } from "../definitions";

export type Action = ActionType<typeof actions>;

export type State = DeepReadonly<
  {
    isLoading: boolean;
    isAuthenticated: boolean;
    authKeys: AuthKeys | undefined;
  } & AsyncState<Action>
>;

export const defaultState = (): State => ({
  isLoading: false,
  isAuthenticated: false,
  authKeys: undefined,
  error: undefined,
});

export const reducer = createReducer<State, Action>(defaultState(), {
  ["auth.loginPending"]: (state, action) => ({
    ...state,
    error: undefined,
    isLoading: true,
  }),

  ["auth.loginSuccess"]: (state, action) => ({
    ...state,
    isLoading: false,
    isAuthenticated: true,
    authKeys: { ...action.payload.authKeys },
  }),

  ["auth.loginFailure"]: (state, action) => ({
    ...state,
    isLoading: false,
    error: {
      actionType: "auth.loginFailure",
      ...action.payload,
    },
  }),

  ["auth.logoutPending"]: (state, action) => ({
    ...state,
    error: undefined,
    isLoading: true,
  }),

  ["auth.logoutSuccess"]: (state, action) => ({
    ...state,
    isLoading: false,
    isAuthenticated: false,
    authKeys: undefined,
  }),

  ["auth.logoutFailure"]: (state, action) => ({
    ...state,
    isLoading: false,
    error: {
      actionType: "auth.logoutFailure",
      ...action.payload,
    },
  }),

  ["auth.loadSessionPending"]: (state, action) => ({
    ...state,
  }),

  ["auth.loadSessionSuccess"]: (state, action) => ({
    ...state,
  }),

  ["auth.loadSessionFailure"]: (state, action) => ({
    ...state,
  }),

  ["auth.requestPswdResetPending"]: (state, action) => ({
    ...state,
  }),

  ["auth.requestPswdResetSuccess"]: (state, action) => ({
    ...state,
  }),

  ["auth.requestPswdResetFailure"]: (state, action) => ({
    ...state,
  }),

  ["auth.resetPasswordPending"]: (state, action) => ({
    ...state,
  }),

  ["auth.resetPasswordSuccess"]: (state, action) => ({
    ...state,
  }),

  ["auth.resetPasswordFailure"]: (state, action) => ({
    ...state,
  }),

  ["auth.checkVCodePending"]: (state, action) => ({
    ...state,
  }),

  ["auth.checkVCodeSuccess"]: (state, action) => ({
    ...state,
  }),

  ["auth.checkVCodeFailure"]: (state, action) => ({
    ...state,
  }),

  ["auth.registerPending"]: (state, action) => ({
    ...state,
  }),

  ["auth.registerSuccess"]: (state, action) => ({
    ...state,
  }),

  ["auth.registerFailure"]: (state, action) => ({
    ...state,
  }),
});
