import i18n from "i18next";
import i18nBackend from "i18next-xhr-backend";
import LangDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// TODO: dynamic import
// import en from "@i18n/translations/en/main.json";

// the translations
const resources = {
  en: {
    translation: {
      "routes.landing.header": "Where is my mind?",
    },
  },
};

export const initI18N = (defaultLang: string) => {
  i18n
    .use(i18nBackend)
    .use(LangDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources,
      keySeparator: false, // whether to use keys in form `messages.welcome`
      interpolation: {
        escapeValue: false, // react already safes from xss
      },

      // https://github.com/i18next/i18next-browser-languageDetector#detector-options
      detection: {},
    });

  return i18n;
};
