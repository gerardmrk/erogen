import { ChunkExtractor } from "@loadable/server";
import { Services } from "@client/services";
import { storeCreator } from "@client/store";

export class Renderer {
  private appConfig: AppConfig;
  private chunkExtractor: ChunkExtractor;

  public constructor() {
    this.appConfig = INJECTED_APP_CONFIG;
    this.chunkExtractor = new ChunkExtractor({
      stats: INJECTED_ASYNC_MODULE_STATS,
      entrypoints: [INJECTED_APP_ENTRY_POINT_ID],
    });
  }

  private _getStore = () => {
    const services = new Services();
    const createStore = storeCreator(services);
    return createStore();
  };
}
