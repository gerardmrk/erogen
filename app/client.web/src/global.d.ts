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
