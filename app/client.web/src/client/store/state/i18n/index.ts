import { Reducer } from "redux";
import { DeepReadonly } from "utility-types";
import { getType, ActionType, StateType } from "typesafe-actions";

import * as actions from "./actions";

// =============================================================================
// types

export type State = StateType<typeof reducer>;
export type Action = ActionType<typeof actions>;

type _State = DeepReadonly<{
  lang: string;
}>;

// =============================================================================
// reducer

const defaultState = {
  lang: "en",
};

export const reducer: Reducer<_State, Action> = (
  state = defaultState,
  action,
) => {
  switch (action.type) {
    case getType(actions.changeLanguage):
      return { ...state, lang: action.payload.lang };

    default:
      return state;
  }
};
