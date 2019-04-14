import { Dispatcher, Action } from "..";
import { Middleware, MiddlewareAPI, ActionWithMeta } from ".";
import * as actions from "@client/store/state/global-ui-message/actions";

export const globalUIMessageTrigger: Middleware = (api: MiddlewareAPI) => (
  next: Dispatcher,
) => (action: Action) => {
  next(action);

  if (
    !(<ActionWithMeta>action).meta ||
    (<ActionWithMeta>action).meta.triggerMessage === undefined
  ) {
    return;
  }

  const triggerMessage: unknown = (<ActionWithMeta>action).meta.triggerMessage;
  if (triggerMessage === false) {
    api.dispatch(actions.hide());
  } else {
    const { message, messageType } = <
      ReturnType<typeof actions.show>["payload"]
    >triggerMessage;
    api.dispatch(actions.show(message, messageType));

    setTimeout(() => {
      api.dispatch(actions.hide());
    }, 2400);
  }
};

export default globalUIMessageTrigger;
