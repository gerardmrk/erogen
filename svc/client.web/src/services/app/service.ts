import { Injectable, Scope } from '@nestjs/common';
// @ts-ignore
import { jsonRenderer, htmlStreamer, htmlRenderer } from '@app/client.web';
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
  private getHTML;

  public constructor() {
    // TODO: intercept or prevent egress API calls from renderer
    // ----> find and replace with regex: fetch?? renderer build phase only
    this.getJSON = jsonRenderer();
    this.getStream = htmlStreamer();
    this.getHTML = htmlRenderer();
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

  public async renderHTML(url: string, lang: string = 'en'): Promise<string> {
    try {
      const html = await this.getHTML({ url, lang });
      return html;
    } catch (err) {
      console.error(err); // tslint:disable-line
      throw err;
    }
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
