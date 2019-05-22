import { Middleware } from ".";
import { IUserService } from "@client/services/user";
import { getUser } from "../state.user/async.get-user";

export const postLogin = (
  userService: IUserService,
): Middleware => api => next => async action => {
  next(action);

  if (action.type !== "auth.loginSuccess") {
    return;
  }

  api.dispatch(getUser());
};

export default postLogin;
