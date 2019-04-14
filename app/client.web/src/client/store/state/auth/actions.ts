import { createAction } from "typesafe-actions";
import { ActionMetaPayload } from "@client/store/middleware";
import { AuthKeys } from "@client/services/auth";

export const loginPending = createAction(
  "auth.loginPending",
  resolve => (meta: ActionMetaPayload) => resolve(undefined, meta),
);

export const loginSuccess = createAction(
  "auth.loginSuccess",
  resolve => (authKeys: AuthKeys, meta: ActionMetaPayload) =>
    resolve({ authKeys }, meta),
);

export const loginFailure = createAction(
  "auth.loginFailure",
  resolve => (error: Error, meta: ActionMetaPayload) =>
    resolve({ error }, meta),
);

export const logoutPending = createAction(
  "auth.logoutPending",
  resolve => (meta: ActionMetaPayload) => resolve(undefined, meta),
);

export const logoutSuccess = createAction(
  "auth.logoutSuccess",
  resolve => (authKeys: AuthKeys, meta: ActionMetaPayload) =>
    resolve({ authKeys }, meta),
);

export const logoutFailure = createAction(
  "auth.logoutFailure",
  resolve => (error: Error, meta: ActionMetaPayload) =>
    resolve({ error }, meta),
);
