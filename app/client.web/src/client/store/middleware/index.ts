import asyncActionMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { Middleware as _Middleware, MiddlewareAPI as _MiddlewareAPI, applyMiddleware } from "redux"; // prettier-ignore
import { IServices } from "@client/services";
import { Dispatcher, State, Action } from "@client/store";
import { MessageType } from "@client/store/state/global-ui-message";
import globalUIMessageTrigger from "./trigger.global-ui-message";
import globalUILoaderTrigger from "./trigger.global-ui-loader";
import errorHandler from "./error-handler";

export type Middleware = _Middleware<void, State, Dispatcher>;
export type MiddlewareAPI = _MiddlewareAPI<Dispatcher, State>;

export type ActionMetaPayload = {
  triggerLoader?: boolean | TranslationKey;
  triggerMessage?:
    | boolean
    | { messageType: MessageType; message: TranslationKey };
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
    globalUILoaderTrigger,
    globalUIMessageTrigger,
  );

  if (addDevToolsMiddleware) {
    return composeWithDevTools(middleware);
  }

  return middleware;
};
