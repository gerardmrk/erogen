import { Dispatcher, Action } from "..";
import { Middleware, MiddlewareAPI, ActionWithMeta } from ".";
import * as actions from "@client/store/state/global-ui-message/actions";

// prettier-ignore
export const uiMessageTrigger: Middleware = (api: MiddlewareAPI) => (next: Dispatcher) => (action: Action) => {
  next(action);

  if (
    !(<ActionWithMeta>action).meta ||
    (<ActionWithMeta>action).meta.message === undefined
  ) {
    return;
  }

  const messagePayload: unknown = (<ActionWithMeta>action).meta.message;
  if (messagePayload === false) {
    api.dispatch(actions.hide());
  } else {
    api.dispatch(
      actions.show(
        <ReturnType<typeof actions.show>["payload"]>messagePayload,
      ),
    );
  }
};

export default uiMessageTrigger;
