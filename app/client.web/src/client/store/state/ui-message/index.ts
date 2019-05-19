import { ActionType } from "typesafe-actions";

import * as actions from "./actions";
import { createReducer } from "@client/store/create-reducer";

// =============================================================================
// types

export enum MessageLevel {
  Pending = 1,
  Info,
  Warn,
  Error,
  Success,
  Important,
}

export type Action = ActionType<typeof actions>;

export type State = {
  display: boolean;
  level: MessageLevel;
  header: TKey | undefined;
  content: TKey | undefined;
  list: TKey[] | undefined;
  autoDismiss: false | number;
};

// =============================================================================
// reducer

export const DEFAULT_TTL = 2000;

const defaultState = (): State => ({
  display: false,
  level: MessageLevel.Info,
  header: undefined,
  content: undefined,
  list: undefined,
  autoDismiss: DEFAULT_TTL,
});

export const reducer = createReducer<State, Action>(defaultState(), {
  ["uiMessage.show"]: (state, action) => ({
    ...state,
    ...action.payload,
    display: true,
  }),

  ["uiMessage.hide"]: state => ({
    ...state,
    display: false,
    autoDismiss: DEFAULT_TTL,
  }),
});
