import { Dispatcher, State } from "@client/store";
import { IServices } from "@client/services";
import * as actions from "./actions";
import { sleep } from "@client/utils/sleep";
import { MessageLevel } from "../global-ui-message";

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
    dispatch(actions.loginPending({ loader: "Logging in..." }));

    await sleep(2000);

    const { authKeys } = await services.auth.login({
      alias,
      password,
      remember,
    });

    dispatch(
      actions.loginSuccess(authKeys, {
        loader: false,
        message: {
          level: MessageLevel.Success,
          message: "Successfully logged in",
        },
      }),
    );
  } catch (err) {
    dispatch(
      actions.loginFailure(<Error>err, {
        loader: false,
        message: {
          level: MessageLevel.Error,
          message: err.message,
        },
      }),
    );
  }
};
