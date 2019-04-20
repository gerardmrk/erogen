type AppConfig = {
  appUrl: string;
  appName: string;
  appDescription: string;
  appKeywords?: string;
  appImagePath: string;
  appTwitterHandle?: string;
  appTwitterCardType?: "summary" | "summary_large_image" | "app" | "player";
};

type TranslationKey = string;

interface Window {
  _INITIAL_STATE_: any;
}
