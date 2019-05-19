import { DeepReadonly } from "utility-types";
import { ActionType } from "typesafe-actions";

import * as actions from "./actions";
import { createReducer } from "@client/store/create-reducer";

export type Action = ActionType<typeof actions>;

export type State = DeepReadonly<{
  loading: boolean;
  message: TKey | undefined;
}>;

export const defaultState = (): State => ({
  loading: false,
  message: undefined,
});

export const reducer = createReducer<State, Action>(defaultState(), {
  ["uiLoader.show"]: (state, action) => ({
    ...state,
    loading: true,
    message: action.payload.message,
  }),

  ["uiLoader.hide"]: (state, action) => defaultState(),
});
