import { createAction } from "typesafe-actions";
import { User } from "./models";

export const getUserPending = createAction("user.getPending", resolve => () =>
  resolve(),
);

export const getUserSuccess = createAction(
  "user.getSuccess",
  resolve => (user: User) => resolve({ user }),
);

export const getUserFailure = createAction("user.getFailure", resolve => () =>
  resolve(),
);
