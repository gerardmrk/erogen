export const CONFIG_SERVICE = Symbol("CONFIG_SERVICE");

export interface IConfigService {
  assets(): IAssetsConfig;
}

export interface IAssetsConfig {
  rootDir: string;
  urlPrefix: string;
  gzip: boolean;
  brotli: boolean;
}
