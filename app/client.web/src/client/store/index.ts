import { createStore, combineReducers, Dispatch, Middleware as _Middleware, Reducer, Store as _Store } from "redux"; // prettier-ignore
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { StateType } from "typesafe-actions";
import { IServices } from "@client/services";
import { composeMiddleware } from "./middleware";
import * as auth from "./state/auth";
import * as user from "./state/user";
import * as i18n from "./state/i18n";
import * as uiLoader from "./state/global-ui-loader";
import * as uiMessage from "./state/global-ui-message";

export type Store = _Store<State, Action>;
export type State = StateType<typeof reducer>;
export type Action = auth.Action | uiLoader.Action | uiMessage.Action; // prettier-ignore
export type AsyncAction = ThunkAction<Promise<void>, State, IServices, Action>;
export type Dispatcher = Dispatch<Action> & ThunkDispatch<State, IServices, Action>; // prettier-ignore

type _State = {
  auth: auth.State;
  user: user.State;
  i18n: i18n.State;
  uiLoader: uiLoader.State;
  uiMessage: uiMessage.State;
};

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
