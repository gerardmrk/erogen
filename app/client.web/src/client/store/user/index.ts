import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { ProfileSettings, AccountSettings, BillingSettings } from "./models";
import { createReducer } from "../create-reducer";

export type Action = ActionType<typeof actions>;

export type State = {
  profile: ProfileSettings | undefined;
  account: AccountSettings | undefined;
  billing: BillingSettings | undefined;
};

const defaultState = (): State => ({
  profile: undefined,
  account: undefined,
  billing: undefined,
});

export const reducer = createReducer<State, Action>(defaultState(), {
  ["user.getPending"]: (state, action) => {
    return state;
  },
  ["user.getSuccess"]: (state, action) => {
    return state;
  },
  ["user.getFailure"]: (state, action) => {
    return state;
  },
});
