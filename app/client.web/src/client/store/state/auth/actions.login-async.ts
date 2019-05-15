import { Dispatcher, State } from "@client/store";
import { IServices } from "@client/services";
import * as actions from "./actions";
import { MessageType } from "../global-ui-message";
import { sleep } from "@client/utils/sleep";

export const login = (
  alias: string,
  password: string,
  remember: boolean,
) => async (
  dispatch: Dispatcher,
  getState: () => State,
  services: IServices,
) => {
  try {
    dispatch(actions.loginPending({ triggerLoader: "Logging in..." }));

    await sleep(2000);

    const { authKeys } = await services.auth.login({
      alias,
      password,
      remember,
    });

    dispatch(
      actions.loginSuccess(authKeys, {
        triggerLoader: false,
        triggerMessage: {
          messageType: MessageType.Success,
          message: "Success",
        },
      }),
    );
  } catch (err) {
    dispatch(
      actions.loginFailure(<Error>err, {
        triggerLoader: false,
        triggerMessage: {
          messageType: MessageType.Error,
          message: err.message,
        },
      }),
    );
  }
};
