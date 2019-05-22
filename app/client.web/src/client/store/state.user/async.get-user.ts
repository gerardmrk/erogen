import { AsyncAction } from "..";
import * as actions from "./actions";
import { MessageLevel } from "../state.ui-message/models";

// prettier-ignore
export const getUser = (): AsyncAction => async (
  dispatch,
  getState,
  services,
) => {
  try {
    dispatch(actions.getUserPending());

    const data = await services.user.get();

    dispatch(actions.getUserSuccess(data));
  } catch (err) {
    dispatch(actions.getUserFailure({ message: err.message }, {
      error: err,
      loader: false,
      message: { level: MessageLevel.Error, content: err.mesage },
    }));
  }
};
