import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import Cache from "i18next-localstorage-cache";
import LangDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

export const initI18N = async (publicPath: string) => {
  i18n.use(Backend);

  i18n.use(Cache);

  i18n.use(LangDetector);

  i18n.use(initReactI18next); // passes i18n down to react-i18next

  await i18n.init({
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

    react: {
      useSuspense: false,
    },
  });

  return i18n;
};
