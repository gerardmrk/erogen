import { Reducer } from "redux";
import { DeepReadonly } from "utility-types";
import { ActionType, getType, StateType } from "typesafe-actions";

import * as actions from "./actions";

// =============================================================================
// types

export type State = StateType<typeof reducer>;
export type Action = ActionType<typeof actions>;

type _State = DeepReadonly<{
  loading: boolean;
  message: TKey | undefined;
}>;

// =============================================================================
// reducer

const defaultState = {
  loading: false,
  message: undefined,
};

export const reducer: Reducer<_State, Action> = (
  state = defaultState,
  action,
) => {
  switch (action.type) {
    case getType(actions.show):
      return { ...state, loading: true, message: action.payload.message };

    case getType(actions.hide):
      return defaultState;

    default:
      return state;
  }
};
