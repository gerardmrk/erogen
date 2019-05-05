import i18n from "i18next";
import i18nBackend from "i18next-xhr-backend";
import LangDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

export const initI18N = (publicPath: string) => {
  i18n.use(i18nBackend);

  i18n.use(LangDetector);

  i18n.use(initReactI18next); // passes i18n down to react-i18next

  i18n.init({
    load: "languageOnly", // instruct i18n-next to skip region code

    fallbackLng: "en", // our default lang

    keySeparator: false, // whether to use keys in form `messages.welcome`

    interpolation: {
      escapeValue: false, // react already safes from xss
    },

    // https://github.com/i18next/i18next-xhr-backend#backend-options
    backend: {
      loadPath: `${publicPath}i18n/translations/{{lng}}/{{ns}}.json`,
    },

    // https://github.com/i18next/i18next-browser-languageDetector#detector-options
    detection: {},
  });

  return i18n;
};
