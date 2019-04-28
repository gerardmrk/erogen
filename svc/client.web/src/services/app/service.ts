import { resolve } from "path";
import { Injectable, Scope, OnApplicationBootstrap } from "@nestjs/common";
import { Renderer, RendererCache } from "@app/client.web";
import { IAppService } from ".";

@Injectable({
  scope: Scope.DEFAULT,
})
export class AppService implements IAppService, OnApplicationBootstrap {
  private renderer: Renderer;
  private htmlCache: RendererCache;
  private dataCache: RendererCache;

  public constructor() {
    this.htmlCache = new Map<string, Uint8Array>();
    this.dataCache = new Map<string, Uint8Array>();

    this.renderer = new Renderer({
      debug: true,
      cache: { html: this.htmlCache, data: this.dataCache },
    });
  }

  public async onApplicationBootstrap() {
    try {
      await this.renderer.prerenderRoutes({
        lang: "en",
        // writeToDisk: resolve(__dirname, '../../../.cache'),
      });
    } catch (err) {
      throw new Error(`Failed to prerender routes: ${err}`);
    }
  }

  public async getHtmlJsonData(url: string, lang: string = "en"): Promise<any> {
    try {
      const data = await this.renderer.getRouteJSON({ url, lang });
      if (!!data.error) {
        throw data.error;
      }
      return data;
    } catch (err) {
      console.error(err); // tslint:disable-line
      throw err;
    }
  }

  public async renderHTML(url: string, lang: string = "en"): Promise<string> {
    try {
      const html = await this.renderer.getRouteHTML({ url, lang });
      return html;
    } catch (err) {
      console.error(err); // tslint:disable-line
      throw err;
    }
  }

  public async streamHtml(
    resp: NodeJS.WritableStream,
    url: string,
    lang: string = "en",
  ): Promise<any> {
    try {
      const metaData = { ttr: "", statusCode: 0 };
      await this.renderer.streamRouteHTML({ url, lang }, resp, metaData);
      return metaData;
    } catch (err) {
      console.error(err); // tslint:disable-line
      throw err;
    }
  }

  public async getHtmlProtoData(
    url: string,
    lang: string = "en",
  ): Promise<Uint8Array> {
    throw new Error("NotImplemented");
  }
}
