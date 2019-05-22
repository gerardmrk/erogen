/**
 * This middleware listens for any action with a meta payload containing
 * the 'loader' field and dispatches an action with the appropriate fields to
 * the ui-loader state reducer.
 */

import { Middleware, ActionWithMeta } from ".";
import * as actions from "@client/store/state.ui-loader/actions";

export const uiLoaderTrigger: Middleware = api => next => action => {
  next(action);

  if (
    !(action as ActionWithMeta).meta ||
    (action as ActionWithMeta).meta.loader === undefined
  ) {
    return;
  }

  const { loader } = (action as ActionWithMeta).meta;
  if (loader === true || typeof loader === "string") {
    api.dispatch(actions.show(loader as string));
  } else {
    api.dispatch(actions.hide());
  }
};

export default uiLoaderTrigger;
