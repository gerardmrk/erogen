import asyncActionMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { Middleware as _Middleware, MiddlewareAPI as _MiddlewareAPI, applyMiddleware } from "redux"; // prettier-ignore
import { IServices } from "@client/services";
import { Dispatcher, State, Action } from "@client/store";
import uiMessageTrigger from "./trigger.ui-message";
import uiLoaderTrigger from "./trigger.ui-loader";
import errorHandler from "./error-handler";
import { ShowPayload } from "@client/store/state.ui-message/actions";

export type Middleware = _Middleware<void, State, Dispatcher>;
export type MiddlewareAPI = _MiddlewareAPI<Dispatcher, State>;

export type ActionMetaPayload = {
  loader?: boolean | TKey;
  message?: boolean | ShowPayload;
};

export type ActionWithMeta = Action & {
  meta: ActionMetaPayload;
};

export const composeMiddleware = (
  services: IServices,
  addDevToolsMiddleware: boolean = false,
) => {
  const middleware = applyMiddleware(
    asyncActionMiddleware.withExtraArgument(services),
    errorHandler(services.errorReporter),
    uiMessageTrigger,
    uiLoaderTrigger,
  );

  if (addDevToolsMiddleware) {
    return composeWithDevTools(middleware);
  }

  return middleware;
};
