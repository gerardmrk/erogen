import { createAction } from "typesafe-actions";

export const changeLanguage = createAction(
  "i18n.changeLanguage",
  resolve => (lang: string) => resolve({ lang }),
);
