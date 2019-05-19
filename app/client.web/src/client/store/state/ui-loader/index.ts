import { Reducer } from "redux";
import { DeepReadonly } from "utility-types";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "./actions";

// =============================================================================
// types

export type Action = ActionType<typeof actions>;

export type State = DeepReadonly<{
  loading: boolean;
  message: TKey | undefined;
}>;

// =============================================================================
// reducer

const defaultState = (): State => ({
  loading: false,
  message: undefined,
});

export const reducer: Reducer<State, Action> = (
  state = defaultState(),
  action,
): State => {
  switch (action.type) {
    case getType(actions.show):
      return { ...state, loading: true, message: action.payload.message };

    case getType(actions.hide):
      return defaultState();

    default:
      return state;
  }
};
