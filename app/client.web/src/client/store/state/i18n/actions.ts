import { createAction } from "typesafe-actions";

export type ChangeLanguagePayload = {
  lang: string;
};

export const changeLanguage = createAction(
  "i18n.changeLanguage",
  resolve => (payload: ChangeLanguagePayload) => resolve(payload),
);
