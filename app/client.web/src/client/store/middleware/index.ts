import asyncActionMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { Middleware as _Middleware, MiddlewareAPI as _MiddlewareAPI, applyMiddleware } from "redux"; // prettier-ignore
import { IServices } from "@client/services";
import { Dispatcher, State, Action } from "@client/store";
import globalUIMessageTrigger from "./trigger.global-ui-message";
import globalUILoaderTrigger from "./trigger.global-ui-loader";
import errorHandler from "./error-handler";
import { ShowPayload } from "../state/global-ui-message/actions";

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
    globalUIMessageTrigger,
    globalUILoaderTrigger,
  );

  if (addDevToolsMiddleware) {
    return composeWithDevTools(middleware);
  }

  return middleware;
};
