import * as React from "react";

export const ConfigContext = React.createContext<AppConfig>({
  appUrl: "",
  appName: "",
  appDescription: "",
  appImagePath: "",
});
