import { Dispatcher, Action } from "..";
import { Middleware, MiddlewareAPI, ActionWithMeta } from ".";
import * as actions from "@client/store/state/ui-loader/actions";

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
