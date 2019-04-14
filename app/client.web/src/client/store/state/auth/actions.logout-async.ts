import { Dispatcher, State } from "@client/store";
import { IServices } from "@client/services";
import * as actions from "./actions";
import { MessageType } from "../global-ui-message";

export const logout = () => async (
  dispatch: Dispatcher,
  getState: () => State,
  services: IServices,
) => {
  try {
    dispatch(actions.logoutPending({ triggerLoader: "Logging out..." }));

    await services.auth.logout();

    dispatch(
      actions.logoutSuccess({
        triggerLoader: false,
        triggerMessage: {
          messageType: MessageType.Success,
          message: "You've been logged out",
        },
      }),
    );
  } catch (err) {
    dispatch(
      actions.logoutFailure(<Error>err, {
        triggerLoader: false,
        triggerMessage: {
          messageType: MessageType.Error,
          message: err.message,
        },
      }),
    );
  }
};
