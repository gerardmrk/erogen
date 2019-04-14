import { Dispatcher, Action } from "..";
import { Middleware, MiddlewareAPI, ActionWithMeta } from ".";
import { Action as GlobalUIMessageAction } from "@client/store/state/global-ui-message";

export const globalUIMessageTrigger: Middleware = (api: MiddlewareAPI) => (
  next: Dispatcher,
) => (action: Action) => {
  next(action);

  if (
    !(<ActionWithMeta>action).meta ||
    !(<ActionWithMeta>action).meta.triggerMessage
  ) {
    return;
  }

  api.dispatch(<GlobalUIMessageAction>(
    (<ActionWithMeta>action).meta.triggerMessage
  ));
};

export default globalUIMessageTrigger;
