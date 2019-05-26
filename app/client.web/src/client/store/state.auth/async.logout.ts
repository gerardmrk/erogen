import { AsyncAction } from "@client/store";
import * as actions from "./actions";
import { MessageLevel } from "../state.ui-message/models";

// prettier-ignore
export const logout = (): AsyncAction => async (
  dispatch,
  getState,
  services,
) => {
  try {
    dispatch(actions.logoutPending({ loader: "messages.logging-out" }));

    await services.auth.logout();

    dispatch(actions.logoutSuccess({
      loader: false,
      message: {
        level: MessageLevel.Info,
        content: "messages.logout-success.message",
        autoDismiss: 800,
      },
    }));
  } catch (err) {
    dispatch(actions.logoutFailure({ message: err.message }, {
      error: err,
      loader: false,
      message: {
        level: MessageLevel.Error,
        content: err.message,
      },
    }));
  }
};
