import { Injectable, Scope } from '@nestjs/common';
// @ts-ignore
import { jsonRenderer, htmlStreamer } from '@local/renderer';
// import { RenderResponse } from '@renderer/engine/render-engine';
// import { RenderJsonFn, StreamHtmlFn } from '@renderer/index';
// import { StreamMetaData } from '@renderer/engine/stream-engine';
import { IAppService } from '.';

@Injectable({
  scope: Scope.DEFAULT,
})
export class AppService implements IAppService {
  private getJSON;
  private getStream;

  public constructor() {
    // TODO: add cache store - publ routes
    // TODO: add cache store - priv routes

    // TODO: intercept or prevent egress API calls from renderer
    // ----> find and replace with regex: fetch?? renderer build phase only
    this.getJSON = jsonRenderer();
    this.getStream = htmlStreamer();
  }

  public async getHtmlJsonData(url: string, lang: string = 'en'): Promise<any> {
    try {
      const data = await this.getJSON({ url, lang });
      if (!!data.error) {
        throw data.error;
      }
      return data;
    } catch (err) {
      console.error(err); // tslint:disable-line
      throw err;
    }
  }

  public async getHtmlProtoData(
    url: string,
    lang: string = 'en',
  ): Promise<Uint8Array> {
    throw new Error('NotImplemented');
  }

  public async streamHtml(
    resp: NodeJS.WritableStream,
    url: string,
    lang: string = 'en',
  ): Promise<any> {
    try {
      const metaData = {};
      await this.getStream({ url, lang }, resp, metaData);
      return metaData;
    } catch (err) {
      console.error(err); // tslint:disable-line
      throw err;
    }
  }
}
