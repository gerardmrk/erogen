type AppConfig = {
  // [SEO] App's canonical URL.
  appUrl: string;
  // [SEO] App name. Will be used for current route's title if none provided.
  appName: string;
  // [SEO] App's main description, and
  // default value to use if none provided by the current route.
  appDescription: string;
  // [SEO] App's main keywords, in comma-separated list, and
  // default value to use if none provided by the current route.
  appKeywords?: string;
  // [SEO] App's main image, in PNG format (500x500 at least), and
  // default value to use if none provided by the current route.
  appImagePath: string;
  // [SEO] Default twitter handle to use if none provided by current route.
  appTwitterHandle?: string;
  // [SEO] Default twitter card type to use if none provided by current route.
  appTwitterCardType?: "summary" | "summary_large_image" | "app" | "player";
  // [I18N] Default/fallback language's ISO code.
  defaultLanguage: string;
  // [I18N] list of supported languages, in ISO 639-1 format.
  supportedLanguages: string[];
};

type TranslationKey = string;

interface Window {
  // Whether the app was built/configured specifically for SSR. Use
  // this flag to load resources that are specific only to SSR. This is NOT
  // synonymous with checking if script is being executed on the server.
  _SSR_MODE_: unknown | boolean;
  // Initial store state provided by the server during SSR.
  // This is only relevant if the app is in SSR mode. see ./store for typings.
  _INITIAL_STATE_: unknown | object;
  // I18n resources provided by the server during SSR.
  // { preloadables: string[]; initialLang: string; initialStore: object }
  _I18N_RESOURCES_: unknown | object;
}

type AsyncModuleStats = {
  errors: string[];
  warnings: string[];
  hash: string;
  publicPath: string;
  outputPath: string;
  assetsByChunkName: { [ChunkName: string]: string | string[] };
  assets: AsyncAsset[];
  filteredAssets: number;
  entrypoints: { [EntrypointName: string]: AsyncChunk };
  namedChunkGroups: { [ChunkName: string]: AsyncChunk };
  children: AsyncModuleStats[];
};

type AsyncAsset = {
  name: string;
  size: number;
  chunks: number[];
  chunkNames: string[];
  emitted: false;
};

type AsyncChunk = {
  chunks: number[];
  assets: string[];
  children: object;
  childAssets: object;
};
