import asyncActionMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { Middleware as _Middleware, MiddlewareAPI as _MiddlewareAPI, applyMiddleware, Dispatch } from "redux"; // prettier-ignore
import { IServices } from "@client/services";
import { State, Action, Dispatcher } from "@client/store";
import { ShowPayload } from "@client/store/state.ui-message/actions";
import uiMessageTriggerMiddleware from "./ui-message-trigger";
import uiLoaderTriggerMiddleware from "./ui-loader-trigger";
import errorHandlerMiddleware from "./error-handler";
import postLoginMiddleware from "./post-login";

export interface Middleware {
  (api: MiddlewareAPI): (next: Dispatch<Action>) => (action: Action) => void;
}

export type MiddlewareAPI = _MiddlewareAPI<Dispatcher, State>;

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
    postLoginMiddleware(),
    uiMessageTriggerMiddleware(),
    uiLoaderTriggerMiddleware(),
    errorHandlerMiddleware(services.errors),
  );

  if (addDevToolsMiddleware) {
    return composeWithDevTools(middleware);
  }

  return middleware;
};
