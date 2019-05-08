import "jest-enzyme";

declare global {
  // available to both client and renderer
  const INJECTED_DEV_MODE: boolean;
  const INJECTED_PUBLIC_PATH: string;
  const INJECTED_TRANSLATIONS_PATH: string;
  const INJECTED_UNTRANSLATED_PATH: string;
  const INJECTED_APP_CONFIG: AppConfig;
  const INJECTED_APP_ENTRY_POINT_ID: string;
  const INJECTED_APP_MOUNT_POINT_ID: string;
  // available to renderer only
  const INJECTED_GENERATED_HTML: string;
  const INJECTED_ASYNC_MODULE_STATS: AsyncModuleStats;
}

declare module "@loadable/server" {
  interface ChunkExtractor {
    getCssString(): Promise<string>;
  }
}
