import { createStore, combineReducers, Dispatch, Middleware as _Middleware, Reducer, Store as _Store } from "redux"; // prettier-ignore
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { StateType } from "typesafe-actions";
import { IServices } from "@client/services";
import { composeMiddleware } from "./middleware";
import * as auth from "./auth";
import * as user from "./user";
import * as i18n from "./i18n";
import * as uiLoader from "./ui-loader";
import * as uiMessage from "./ui-message";

export type Store = _Store<State, Action>;
export type State = StateType<typeof reducer>;
export type Action = auth.Action | user.Action | uiLoader.Action | uiMessage.Action; // prettier-ignore
export type AsyncAction = ThunkAction<Promise<void>, State, IServices, Action>;
export type Dispatcher = Dispatch<Action> & ThunkDispatch<State, IServices, Action>; // prettier-ignore

// root reducer type def
type _State = {
  auth: auth.State;
  user: user.State;
  i18n: i18n.State;
  uiLoader: uiLoader.State;
  uiMessage: uiMessage.State;
};

// the root reducer (think: state store)
const reducer: Reducer<_State, Action> = combineReducers({
  auth: auth.reducer,
  user: user.reducer,
  i18n: i18n.reducer,
  uiLoader: uiLoader.reducer,
  uiMessage: uiMessage.reducer,
});

export const storeCreator = (services: IServices, devMode: boolean = false) => (
  preloadedState?: State,
): Store => {
  return createStore(
    reducer,
    preloadedState,
    composeMiddleware(services, devMode),
  );
};
