import { Dispatcher, State } from "@client/store";
import { IServices } from "@client/services";
import * as actions from "./actions";
import { sleep } from "@client/utils/sleep";
import { MessageLevel } from "../state.ui-message/models";

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
      actions.logoutFailure(
        { message: err.message },
        {
          error: err,
          loader: false,
          message: {
            level: MessageLevel.Error,
            content: err.message,
          },
        },
      ),
    );
  }
};
