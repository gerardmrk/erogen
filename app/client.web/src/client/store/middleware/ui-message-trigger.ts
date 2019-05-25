/**
 * This middleware listens for any action with a meta payload containing
 * the 'message' field and dispatches an action with the appropriate fields to
 * the ui-message state reducer.
 */

import { Middleware, ActionWithMeta } from ".";
import * as actions from "@client/store/state.ui-message/actions";

export const uiMessageTrigger = (): Middleware => api => next => action => {
  next(action);

  if (
    !(action as ActionWithMeta).meta ||
    (action as ActionWithMeta).meta.message === undefined
  ) {
    return;
  }

  const messagePayload: unknown = (action as ActionWithMeta).meta.message;
  if (messagePayload === false) {
    api.dispatch(actions.hide());
  } else {
    api.dispatch(
      actions.show(messagePayload as ReturnType<
        typeof actions.show
      >["payload"]),
    );
  }
};

export default uiMessageTrigger;
