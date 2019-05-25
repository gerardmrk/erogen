/**
 * Use this middleware to handle post-authentication setups
 */

import { Middleware } from ".";
import { getUser } from "../state.user/async.get-user";

export const postLogin = (): Middleware => api => next => async action => {
  next(action);

  if (action.type !== "auth.loginSuccess") {
    return;
  }

  api.dispatch(getUser());
};

export default postLogin;
