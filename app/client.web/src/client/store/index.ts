import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { createStore, combineReducers, Dispatch, Reducer, Store as _Store } from "redux"; // prettier-ignore
import { IServices } from "@client/services";
import { composeMiddleware } from "./middleware";
import * as auth from "./state.auth";
import * as user from "./state.user";
import * as i18n from "./state.i18n";
import * as uiLoader from "./state.ui-loader";
import * as uiMessage from "./state.ui-message";

/*******************************************************************************
 * TYPES
 ******************************************************************************/

// Async Action
export type AsyncAction = ThunkAction<Promise<void>, State, IServices, Action>;

// Action
export type Action =
  | auth.Action
  | user.Action
  | uiLoader.Action
  | uiMessage.Action;

// State
export type State = {
  auth: auth.State;
  user: user.State;
  i18n: i18n.State;
  uiLoader: uiLoader.State;
  uiMessage: uiMessage.State;
};

// Store
export type Store = _Store<State, Action>;

// Dispatcher
export type Dispatcher = Dispatch<Action> &
  ThunkDispatch<State, IServices, Action>;

/*******************************************************************************
 * REDUCER
 ******************************************************************************/

// the root reducer (think: state store)
const reducer: Reducer<State, Action> = combineReducers({
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
