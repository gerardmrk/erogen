import { createAction } from "typesafe-actions";
import { ActionMetaPayload } from "@client/store/middleware";
import { AuthKeys } from "@client/services/auth/svc.static";

export type LoginFailurePayload = {
  code?: string;
  message: string;
};

export type LogoutFailurePayload = {
  code?: string;
  message: string;
};

export const loginPending = createAction(
  "auth.loginPending",
  resolve => (meta: ActionMetaPayload) => {
    return resolve(undefined, meta);
  },
);

export const loginSuccess = createAction(
  "auth.loginSuccess",
  resolve => (authKeys: AuthKeys, meta: ActionMetaPayload) => {
    return resolve({ authKeys }, meta);
  },
);

export const loginFailure = createAction(
  "auth.loginFailure",
  resolve => (payload: LoginFailurePayload, meta: ActionMetaPayload) => {
    return resolve(payload, meta);
  },
);

export const logoutPending = createAction(
  "auth.logoutPending",
  resolve => (meta: ActionMetaPayload) => {
    return resolve(undefined, meta);
  },
);

export const logoutSuccess = createAction(
  "auth.logoutSuccess",
  resolve => (meta: ActionMetaPayload) => {
    return resolve(undefined, meta);
  },
);

export const logoutFailure = createAction(
  "auth.logoutFailure",
  resolve => (payload: LogoutFailurePayload, meta: ActionMetaPayload) => {
    return resolve(payload, meta);
  },
);
