import { createAction } from "typesafe-actions";
import { User } from "./models";
import { ActionMetaPayload } from "../middleware";

export type GetUserFailurePayload = {
  code?: string;
  message: string;
};

export const getUserPending = createAction("user.getPending", resolve => () => {
  return resolve();
});

export const getUserSuccess = createAction(
  "user.getSuccess",
  resolve => (user: User) => {
    return resolve(user);
  },
);

export const getUserFailure = createAction(
  "user.getFailure",
  resolve => (payload: GetUserFailurePayload, meta: ActionMetaPayload) => {
    return resolve(payload, meta);
  },
);
