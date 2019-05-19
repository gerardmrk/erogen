import { createAction } from "typesafe-actions";

export const getUserPending = createAction("user.getPending", resolve => () =>
  resolve(),
);

export const getUserSuccess = createAction("user.getSuccess", resolve => () =>
  resolve(),
);

export const getUserFailure = createAction("user.getFailure", resolve => () =>
  resolve(),
);
