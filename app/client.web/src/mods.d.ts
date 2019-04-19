import "jest-enzyme";

declare global {
  const INJECTED_DEV_MODE: boolean;
  const INJECTED_APP_CONFIG: AppConfig;
}
