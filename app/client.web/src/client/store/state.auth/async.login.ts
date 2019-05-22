import { Dispatcher, State, AsyncAction } from "@client/store";
import { IServices } from "@client/services";
import * as actions from "./actions";
import { sleep } from "@client/utils/sleep";
import { MessageLevel } from "../state.ui-message/models";

// prettier-ignore
export const login = (
  alias: string,
  password: string,
  remember: boolean,
): AsyncAction => async (
  dispatch: Dispatcher,
  getState: () => State,
  services: IServices,
) => {
  try {
    dispatch(actions.loginPending({ loader: "Logging in..." }));

    await sleep(900);

    const { authKeys } = await services.auth.login({
      alias,
      password,
      remember,
    });
    
    dispatch(actions.loginSuccess(authKeys, {
      loader: false,
      message: {
        level: MessageLevel.Success,
        header: "Success!",
        content: "You're now logged in.",
        autoDismiss: 1000,
      },
    }));
  } catch (err) {
    dispatch(actions.loginFailure({ message: err.message }, {
      error: err,
      loader: false,
      message: { level: MessageLevel.Error, content: err.message },
    }));
  }
};
