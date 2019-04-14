import { Reducer } from "redux";
import { DeepReadonly } from "utility-types";
import { ActionType, getType, StateType } from "typesafe-actions";

import * as actions from "./actions";

// =============================================================================
// types

export enum MessageType {
  Info,
  Warn,
  Error,
  Success,
  Failure,
  Important,
}

export type State = StateType<typeof reducer>;
export type Action = ActionType<typeof actions>;

type _State = DeepReadonly<{
  messageType: MessageType;
  message: TranslationKey | undefined;
}>;

// =============================================================================
// reducer

const defaultState = {
  messageType: MessageType.Info,
  message: undefined,
};

export const reducer: Reducer<_State, Action> = (
  state = defaultState,
  action,
) => {
  switch (action.type) {
    case getType(actions.show):
      const { message, messageType } = action.payload;
      return { ...state, message, messageType };

    case getType(actions.hide):
      return defaultState;

    default:
      return state;
  }
};
