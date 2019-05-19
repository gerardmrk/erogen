import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "./actions";

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

export const reducer: Reducer<State, Action> = (
  state = defaultState(),
  action,
): State => {
  switch (action.type) {
    case getType(actions.show):
      return {
        ...state,
        ...action.payload,
        display: true,
      } as State;

    case getType(actions.hide):
      return {
        ...state,
        display: false,
        autoDismiss: DEFAULT_TTL,
      };

    default:
      return state;
  }
};
