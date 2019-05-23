import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { ProfileSettings, AccountSettings, BillingSettings } from "./models";
import { createReducer } from "../create-reducer";
import { DeepReadonly } from "utility-types";
import { AsyncState } from "../definitions";

export type Action = ActionType<typeof actions>;

export type State = DeepReadonly<
  {
    profile: ProfileSettings | undefined;
    account: AccountSettings | undefined;
    billing: BillingSettings | undefined;
  } & AsyncState<Action>
>;

export const defaultState = (): State => ({
  isLoading: false,
  error: undefined,
  profile: undefined,
  account: undefined,
  billing: undefined,
});

export const reducer = createReducer<State, Action>(defaultState(), {
  ["user.getPending"]: (state, action) => ({
    ...state,
    isLoading: true,
  }),

  ["user.getSuccess"]: (state, action) => ({
    ...state,
    isLoading: false,
    profile: { ...action.payload.profile },
    account: { ...action.payload.account },
    billing: { ...action.payload.billing },
  }),

  ["user.getFailure"]: (state, action) => ({
    ...state,
    isLoading: false,
  }),
});
