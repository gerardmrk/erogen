import { Reducer } from "redux";
import { DeepReadonly } from "utility-types";
import { ActionType, getType, StateType } from "typesafe-actions";

import * as actions from "./actions";
import { AuthKeys } from "@client/services/auth";

// =============================================================================
// types

export type State = StateType<typeof reducer>;
export type Action = ActionType<typeof actions>;

type _State = DeepReadonly<{
  isAuthenticated: boolean;
  authKeys: AuthKeys | undefined;
}>;

// =============================================================================
// reducer

const defaultState = {
  isAuthenticated: false,
  authKeys: undefined,
};

export const reducer: Reducer<_State, Action> = (
  state = defaultState,
  action,
) => {
  switch (action.type) {
    case getType(actions.loginPending):
      return state;

    case getType(actions.loginSuccess):
      return {
        ...state,
        isAuthenticated: true,
        authKeys: action.payload.authKeys,
      };

    case getType(actions.loginFailure):
      return state;

    case getType(actions.logoutPending):
      return state;

    case getType(actions.logoutSuccess):
      return defaultState;

    case getType(actions.logoutFailure):
      return state;

    default:
      return state;
  }
};
