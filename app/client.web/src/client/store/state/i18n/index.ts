import { Reducer } from "redux";
import { DeepReadonly } from "utility-types";
import { getType, ActionType } from "typesafe-actions";

import * as actions from "./actions";

// =============================================================================
// types

export type Action = ActionType<typeof actions>;

export type State = DeepReadonly<{
  lang: string;
}>;

// =============================================================================
// reducer

const defaultState = (): State => ({
  lang: "en",
});

export const reducer: Reducer<State, Action> = (
  state = defaultState(),
  action,
) => {
  switch (action.type) {
    case getType(actions.changeLanguage):
      return { ...state, lang: action.payload.lang };

    default:
      return state;
  }
};
