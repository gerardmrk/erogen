import i18next from "i18next";
import Backend from "i18next-xhr-backend";
import Cache from "i18next-localstorage-cache";
import LangDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18next.use(Backend);

i18next.use(Cache);

i18next.use(LangDetector);

i18next.use(initReactI18next); // passes i18n down to react-i18next

i18next.init({
  // await initI18nAsync(i18next, {
  debug: true,

  initImmediate: false,

  saveMissing: true,

  saveMissingTo: "current",

  load: "languageOnly", // instruct i18n-next to skip region code

  fallbackLng: "en", // our default lang

  keySeparator: false, // whether to use keys in form `messages.welcome`

  defaultNS: "",

  interpolation: {
    escapeValue: false, // react already safes from xss
  },

  // https://github.com/i18next/i18next-xhr-backend#backend-options
  backend: {
    addPath: INJECTED_TRANSLATIONS_PATH,
    loadPath: INJECTED_UNTRANSLATED_PATH,
  },

  // https://github.com/i18next/i18next-browser-languageDetector#detector-options
  // detection: {},

  react: {
    useSuspense: false,
  },
});

export default i18next;

/**
 * wraps the i18next instance with a promise
 */
function initI18nAsync(
  i18n: i18next.i18n,
  opts: i18next.InitOptions,
): Promise<i18next.TFunction> {
  return new Promise((resolve, reject) => {
    i18next.init(opts, (err: Error | null, t: i18next.TFunction) => {
      if (err) return reject(err);
      return resolve(t);
    });
  });
}
