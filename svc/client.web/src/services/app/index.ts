// import { StreamMetaData } from '@renderer/engine/stream-engine';
// import { RenderResponse } from '@renderer/engine/render-engine';

export const APP_SERVICE = Symbol('APP_SERVICE');

export interface IAppService {
  streamHtml(
    resp: NodeJS.WritableStream,
    url: string,
    lang: string,
  ): Promise<any>;

  getHtmlJsonData(url: string, lang: string): Promise<any>;

  getHtmlProtoData(url: string, lang: string): Promise<Uint8Array>;
}
