import asyncActionMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { Middleware as _Middleware, MiddlewareAPI as _MiddlewareAPI, applyMiddleware, Dispatch } from "redux"; // prettier-ignore
import { IServices } from "@client/services";
import { State, Action, Dispatcher } from "@client/store";
import uiMessageTrigger from "./trigger.ui-message";
import uiLoaderTrigger from "./trigger.ui-loader";
import errorHandler from "./error-handler";
import { ShowPayload } from "@client/store/state.ui-message/actions";
import postLogin from "./post-login";

export interface Middleware {
  (api: _MiddlewareAPI<Dispatcher, State>): (
    next: Dispatch<Action>,
  ) => (action: Action) => void;
}

export type ActionWithMeta = Action & {
  meta: ActionMetaPayload;
};

export type ActionMetaPayload = {
  error?: Error;
  loader?: boolean | TKey;
  message?: boolean | ShowPayload;
};

export const composeMiddleware = (
  services: IServices,
  addDevToolsMiddleware: boolean = false,
) => {
  const middleware = applyMiddleware(
    asyncActionMiddleware.withExtraArgument(services),
    uiMessageTrigger,
    uiLoaderTrigger,
    postLogin(services.user),
    errorHandler(services.errors),
  );

  if (addDevToolsMiddleware) {
    return composeWithDevTools(middleware);
  }

  return middleware;
};
