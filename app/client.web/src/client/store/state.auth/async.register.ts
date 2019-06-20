import { AsyncAction } from "@client/store";
import * as actions from "./actions";
import { RegisterParams } from "@client/services/auth";

export type RegisterPayload = RegisterParams & {};

// prettier-ignore
export const register = (
  payload: RegisterPayload,
  callback: (err: Error | null) => void
): AsyncAction => async (
  dispatch,
  getState,
  services,
) => {
  try {
    dispatch(actions.registerPending());

    await services.auth.register(payload);
    
    dispatch(actions.registerSuccess())
    callback(null);
  } catch (err) {
    dispatch(actions.registerFailure());
    callback(err);
  }
};
