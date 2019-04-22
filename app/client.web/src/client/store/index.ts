import { createStore, combineReducers, Dispatch, Middleware as _Middleware, Reducer, Store as _Store } from "redux"; // prettier-ignore
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { StateType } from "typesafe-actions";
import { IServices } from "@client/services";
import { composeMiddleware } from "./middleware";
import * as auth from "./state/auth";
import * as globalUILoader from "./state/global-ui-loader";
import * as globalUIMessage from "./state/global-ui-message";

export type Store = _Store<State, Action>;
export type State = StateType<typeof reducer>;
export type Action = auth.Action | globalUILoader.Action | globalUIMessage.Action; // prettier-ignore
export type AsyncAction = ThunkAction<Promise<void>, State, IServices, Action>;
export type Dispatcher = Dispatch<Action> & ThunkDispatch<State, IServices, Action>; // prettier-ignore

type _State = {
  auth: auth.State;
  globalUILoader: globalUILoader.State;
  globalUIMessage: globalUIMessage.State;
};

const reducer: Reducer<_State, Action> = combineReducers({
  auth: auth.reducer,
  globalUILoader: globalUILoader.reducer,
  globalUIMessage: globalUIMessage.reducer
});

export const storeCreator = (services: IServices, devMode: boolean = false) => (
  preloadedState?: State
): Store => {
  return createStore(
    reducer,
    preloadedState,
    composeMiddleware(services, devMode)
  );
};
