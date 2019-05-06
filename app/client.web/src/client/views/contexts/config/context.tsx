import * as React from "react";

export const ConfigContext = React.createContext<AppConfig>({
  appUrl: "",
  appName: "",
  appDescription: "",
  appKeywords: "",
  appImagePath: "",
  appTwitterHandle: "",
  appTwitterCardType: "summary_large_image",
  defaultLanguage: "en",
  supportedLanguages: [],
});
