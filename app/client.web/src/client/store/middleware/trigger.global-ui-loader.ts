import { Dispatcher, Action } from "..";
import { Middleware, MiddlewareAPI, ActionWithMeta } from ".";
import * as actions from "@client/store/state/global-ui-loader/actions";

export const globalUILoaderTrigger: Middleware = (api: MiddlewareAPI) => (
  next: Dispatcher,
) => (action: Action) => {
  next(action);

  if (
    !(<ActionWithMeta>action).meta ||
    (<ActionWithMeta>action).meta.triggerLoader === undefined
  ) {
    return;
  }

  const { triggerLoader } = (<ActionWithMeta>action).meta;
  if (triggerLoader === true || typeof triggerLoader === "string") {
    api.dispatch(actions.show(<string>triggerLoader));
  } else {
    api.dispatch(actions.hide());
  }
};

export default globalUILoaderTrigger;
