import { Reducer } from "redux";
import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type Action = ActionType<typeof actions>;

export type State = {
  profile: {};
  account: {};
  billing: {};
};

const defaultState = (): State => ({
  profile: {},
  account: {},
  billing: {},
});

export const reducer: Reducer<State, Action> = (
  state = defaultState(),
  action,
): State => {
  switch (action.type) {
    default:
      return state;
  }
};
