import { StateType } from "typesafe-actions";
import { combineReducers, Reducer, Store as _Store } from "redux";
import asyncMiddleware, { ThunkAction } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { Services } from "@client/services";
import * as globalUILoader from "./state/global-ui-loader";
import * as globalUIMessage from "./state/global-ui-message";

export type State = StateType<typeof reducer>;
export type Action = globalUILoader.Action | globalUIMessage.Action;
export type AsyncAction = ThunkAction<Promise<void>, State, Services, Action>;

export type Store = _Store<State, Action>;

type _State = {
  globalUILoader: globalUILoader.State;
  globalUIMessage: globalUIMessage.State;
};

const reducer: Reducer<_State, Action> = combineReducers({
  globalUILoader: globalUILoader.reducer,
  globalUIMessage: globalUIMessage.reducer,
});
