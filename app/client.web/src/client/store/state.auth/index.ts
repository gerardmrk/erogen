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
});
