import { Dispatcher, Action } from "..";
import { Middleware, MiddlewareAPI, ActionWithMeta } from ".";
import { Action as GlobalUILoaderAction } from "@client/store/state/global-ui-loader";

export const globalUILoaderTrigger: Middleware = (api: MiddlewareAPI) => (
  next: Dispatcher,
) => (action: Action) => {
  next(action);

  if (
    !(<ActionWithMeta>action).meta ||
    !(<ActionWithMeta>action).meta.triggerLoader
  ) {
    return;
  }

  api.dispatch(<GlobalUILoaderAction>(
    (<ActionWithMeta>action).meta.triggerLoader
  ));
};

export default globalUILoaderTrigger;
