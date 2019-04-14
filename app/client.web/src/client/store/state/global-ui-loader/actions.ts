import { createAction } from "typesafe-actions";

export const show = createAction(
  "globalUILoader.show",
  resolve => (message?: TranslationKey) => resolve({ message }),
);

export const hide = createAction("globalUILoader.hide");
