import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { ProfileSettings, AccountSettings, BillingSettings } from "./models";
import { createReducer } from "../create-reducer";
import { DeepReadonly } from "utility-types";

export type Action = ActionType<typeof actions>;

export type State = DeepReadonly<{
  profile: ProfileSettings | undefined;
  account: AccountSettings | undefined;
  billing: BillingSettings | undefined;
}>;

export const defaultState = (): State => ({
  profile: { username: "xoxo", displayPicUrl: undefined },
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
