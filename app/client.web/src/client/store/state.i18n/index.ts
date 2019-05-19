import { DeepReadonly } from "utility-types";
import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { createReducer } from "@client/store/create-reducer";

export type Action = ActionType<typeof actions>;

export type State = DeepReadonly<{
  lang: string;
}>;

export const defaultState = (): State => ({
  lang: "en",
});

export const reducer = createReducer<State, Action>(defaultState(), {
  ["i18n.changeLanguage"]: (state, action) => ({
    ...state,
    lang: action.payload.lang,
  }),
});
