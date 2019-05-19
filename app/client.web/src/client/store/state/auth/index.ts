import { Reducer } from "redux";
import { DeepReadonly } from "utility-types";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "./actions";
import { AuthKeys } from "@client/services/auth";

// =============================================================================
// types

export type Action = ActionType<typeof actions>;

export type State = DeepReadonly<{
  isAuthenticated: boolean;
  authKeys: AuthKeys | undefined;
}>;

// =============================================================================
// reducer

const defaultState = (): State => ({
  isAuthenticated: false,
  authKeys: undefined,
});

export const reducer: Reducer<State, Action> = (
  state = defaultState(),
  action,
): State => {
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
      return defaultState();

    case getType(actions.logoutFailure):
      return state;

    default:
      return state;
  }
};

// interface Red<S, A extends Action> {
//   [k: string]: (state: S, action: A) => S;
// }

// const xo: Red<State, Action> = {
//   [getType(actions.loginSuccess)]: (state, action) => {
//     return state;
//   },
// };
