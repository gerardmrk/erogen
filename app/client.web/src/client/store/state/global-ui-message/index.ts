import { Reducer } from "redux";
import { ActionType, getType, StateType } from "typesafe-actions";

import * as actions from "./actions";

// =============================================================================
// types

export enum MessageLevel {
  Pending = 1,
  Info,
  Warn,
  Error,
  Success,
  Failure,
  Important,
}

export type State = StateType<typeof reducer>;
export type Action = ActionType<typeof actions>;

type _State = {
  display: boolean;
  level: MessageLevel;
  header: TKey | undefined;
  content: TKey | undefined;
  list: TKey[] | undefined;
  autoDismiss: false | number;
};

// =============================================================================
// reducer

const defaultState = {
  display: false,
  level: MessageLevel.Info,
  header: undefined,
  content: undefined,
  list: [],
  autoDismiss: 1800,
};

export const reducer: Reducer<_State, Action> = (
  state = defaultState,
  action,
): State => {
  switch (action.type) {
    case getType(actions.show):
      return {
        ...state,
        ...action.payload,
        display: true,
      } as _State;

    case getType(actions.hide):
      return {
        display: false,
        level: MessageLevel.Info,
        header: undefined,
        content: undefined,
        list: undefined,
        autoDismiss: 1800,
      };

    default:
      return state;
  }
};
