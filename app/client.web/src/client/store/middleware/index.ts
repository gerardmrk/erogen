import asyncActionMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { Middleware as _Middleware, MiddlewareAPI as _MiddlewareAPI, applyMiddleware } from "redux"; // prettier-ignore
import { Services } from "@client/services";
import { Dispatcher, State, Action } from "@client/store";
import { Action as GlobalUILoaderAction } from "@client/store/state/global-ui-loader";
import { Action as GlobalUIMessageAction } from "@client/store/state/global-ui-message";
import globalUIMessageTrigger from "./trigger.global-ui-message";
import globalUILoaderTrigger from "./trigger.global-ui-loader";

export type Middleware = _Middleware<void, State, Dispatcher>;
export type MiddlewareAPI = _MiddlewareAPI<Dispatcher, State>;

export type ActionMetaPayload = {
  triggerLoader?: GlobalUILoaderAction;
  triggerMessage?: GlobalUIMessageAction;
};

export type ActionWithMeta = Action & {
  meta: ActionMetaPayload;
};

export const composeMiddleware = (
  services: Services,
  addDevToolsMiddleware: boolean = false,
) => {
  const middleware = applyMiddleware(
    asyncActionMiddleware.withExtraArgument(services),
    globalUILoaderTrigger,
    globalUIMessageTrigger,
  );

  if (addDevToolsMiddleware) {
    return composeWithDevTools(middleware);
  }

  return middleware;
};
