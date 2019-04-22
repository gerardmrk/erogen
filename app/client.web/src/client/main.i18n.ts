import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
const resources = {
  en: {
    translation: {
      "routes.landing.header": "Where is my mind?"
    }
  }
};

export const initI18N = (defaultLang: string) => {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources,
      lng: defaultLang,
      keySeparator: false, // whether to use keys in form `messages.welcome`
      interpolation: {
        escapeValue: false // react already safes from xss
      }
    });

  return i18n;
};
