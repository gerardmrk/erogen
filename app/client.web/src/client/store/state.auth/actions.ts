import { createAction } from "typesafe-actions";
import { ActionMetaPayload } from "@client/store/middleware";
import { AuthKeys } from "@client/services/auth";

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

export const loadSessionPending = createAction(
  "auth.loadSessionPending",
  resolve => () => {
    return resolve();
  },
);

export const loadSessionSuccess = createAction(
  "auth.loadSessionSuccess",
  resolve => () => {
    return resolve();
  },
);

export const loadSessionFailure = createAction(
  "auth.loadSessionFailure",
  resolve => () => {
    return resolve();
  },
);

export const registerPending = createAction(
  "auth.registerPending",
  resolve => () => {
    return resolve();
  },
);

export const registerSuccess = createAction(
  "auth.registerSuccess",
  resolve => () => {
    return resolve();
  },
);

export const registerFailure = createAction(
  "auth.registerFailure",
  resolve => () => {
    return resolve();
  },
);

export const requestNewPasswordPending = createAction(
  "auth.requestPswdResetPending",
  resolve => () => {
    return resolve();
  },
);

export const requestNewPasswordSuccess = createAction(
  "auth.requestPswdResetSuccess",
  resolve => () => {
    return resolve();
  },
);

export const requestNewPasswordFailure = createAction(
  "auth.requestPswdResetFailure",
  resolve => () => {
    return resolve();
  },
);

export const resetPasswordPending = createAction(
  "auth.resetPasswordPending",
  resolve => () => {
    return resolve();
  },
);

export const resetPasswordSuccess = createAction(
  "auth.resetPasswordSuccess",
  resolve => () => {
    return resolve();
  },
);

export const resetPasswordFailure = createAction(
  "auth.resetPasswordFailure",
  resolve => () => {
    return resolve();
  },
);

export const checkVerificationCodePending = createAction(
  "auth.checkVCodePending",
  resolve => () => {
    return resolve();
  },
);

export const checkVerificationCodeSuccess = createAction(
  "auth.checkVCodeSuccess",
  resolve => () => {
    return resolve();
  },
);

export const checkVerificationCodeFailure = createAction(
  "auth.checkVCodeFailure",
  resolve => () => {
    return resolve();
  },
);

export const checkUsernameExistsPending = createAction(
  "auth.checkUsernameExistsPending",
  resolve => () => {
    return resolve();
  },
);

export const checkUsernameExistsSuccess = createAction(
  "auth.checkUsernameExistsSuccess",
  resolve => () => {
    return resolve();
  },
);

export const checkUsernameExistsFailure = createAction(
  "auth.checkUsernameExistsFailure",
  resolve => () => {
    return resolve();
  },
);
