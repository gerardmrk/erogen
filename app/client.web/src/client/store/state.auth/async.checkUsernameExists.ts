import { AsyncAction } from "@client/store";
import * as actions from "./actions";

// prettier-ignore
export const checkUsernameExists = (
  username: string,
  callback: (err: Error | null, exists?: boolean) => void
): AsyncAction => async (
  dispatch,
  getState,
  services,
) => {
  try {
    dispatch(actions.checkUsernameExistsPending());

    const usernameExists = await services.auth.checkUsernameExists(username);
    
    dispatch(actions.checkUsernameExistsSuccess())
    callback(null, usernameExists);
  } catch (err) {
    dispatch(actions.checkUsernameExistsFailure());
    callback(err);
  }
};
