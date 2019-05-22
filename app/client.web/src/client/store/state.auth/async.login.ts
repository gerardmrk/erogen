import { AsyncAction } from "@client/store";
import * as actions from "./actions";
import { MessageLevel } from "../state.ui-message/models";

// prettier-ignore
export const login = (
  alias: string,
  password: string,
  remember: boolean,
): AsyncAction => async (
  dispatch,
  getState,
  services,
) => {
  try {
    dispatch(actions.loginPending({ loader: "Logging in..." }));

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
