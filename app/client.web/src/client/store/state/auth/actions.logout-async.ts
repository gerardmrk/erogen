import { Dispatcher, State } from "@client/store";
import { IServices } from "@client/services";
import * as actions from "./actions";
import { MessageLevel } from "../global-ui-message";

export const logout = () => async (
  dispatch: Dispatcher,
  getState: () => State,
  services: IServices,
) => {
  try {
    dispatch(actions.logoutPending({ loader: "Logging out..." }));

    await services.auth.logout();

    dispatch(
      actions.logoutSuccess({
        loader: false,
        message: {
          level: MessageLevel.Success,
          message: "You've been logged out",
        },
      }),
    );
  } catch (err) {
    dispatch(
      actions.logoutFailure(<Error>err, {
        loader: false,
        message: {
          level: MessageLevel.Error,
          message: err.message,
        },
      }),
    );
  }
};
