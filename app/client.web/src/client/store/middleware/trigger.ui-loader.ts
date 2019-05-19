/**
 * This middleware listens for any action with a meta payload containing
 * the 'loader' field and dispatches an action with the appropriate fields to
 * the ui-loader state reducer.
 */

import { Dispatcher, Action } from "..";
import { Middleware, MiddlewareAPI, ActionWithMeta } from ".";
import * as actions from "@client/store/ui-loader/actions";

// prettier-ignore
export const uiLoaderTrigger: Middleware = (api: MiddlewareAPI) => (next: Dispatcher) => (action: Action) => {
  next(action);

  if (
    !(<ActionWithMeta>action).meta ||
    (<ActionWithMeta>action).meta.loader === undefined
  ) {
    return;
  }

  const { loader } = (<ActionWithMeta>action).meta;
  if (loader === true || typeof loader === "string") {
    api.dispatch(actions.show(<string>loader));
  } else {
    api.dispatch(actions.hide());
  }
};

export default uiLoaderTrigger;
