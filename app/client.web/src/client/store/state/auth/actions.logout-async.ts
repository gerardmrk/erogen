import { Dispatcher, State } from "@client/store";
import { IServices } from "@client/services";
import * as actions from "./actions";
import { MessageLevel } from "../global-ui-message";
import { sleep } from "@client/utils/sleep";

export const logout = () => async (
  dispatch: Dispatcher,
  getState: () => State,
  services: IServices,
) => {
  try {
    dispatch(actions.logoutPending({ loader: "Logging out..." }));

    await sleep(1000);

    await services.auth.logout();

    dispatch(
      actions.logoutSuccess({
        loader: false,
        message: {
          level: MessageLevel.Info,
          content: "You've been logged out.",
          autoDismiss: 800,
        },
      }),
    );
  } catch (err) {
    dispatch(
      actions.logoutFailure(<Error>err, {
        loader: false,
        message: {
          level: MessageLevel.Error,
          content: err.message,
        },
      }),
    );
  }
};
