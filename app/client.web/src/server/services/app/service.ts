import { Injectable, Scope } from "@nestjs/common";
// @ts-ignore
import { jsonRenderer, htmlStreamer } from "dist/renderer";
import asyncModuleStats from "dist/client/async-modules.json";
import { RenderResponse } from "@renderer/engine/render-engine";
import { RenderJsonFn, StreamHtmlFn } from "@renderer/index";
import { StreamMetaData } from "@renderer/engine/stream-engine";
import { IAppService } from ".";

@Injectable({
  scope: Scope.DEFAULT,
})
export class AppService implements IAppService {
  private getJSON: RenderJsonFn;
  private getStream: StreamHtmlFn;

  public constructor() {
    // TODO: add cache store - publ routes
    // TODO: add cache store - priv routes

    // TODO: intercept or prevent egress API calls from renderer
    // ----> find and replace with regex: fetch?? renderer build phase only

    // TODO: test proto
    // TODO: renderer.readJSON()
    // TODO: renderer.readProto()
    this.getJSON = jsonRenderer(asyncModuleStats);
    this.getStream = htmlStreamer(asyncModuleStats);
  }

  public async getHtmlJsonData(
    url: string,
    lang: string = "en",
  ): Promise<RenderResponse> {
    try {
      const data = await this.getJSON({ url, lang });
      if (!!data.error) throw data.error;
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  public async getHtmlProtoData(
    url: string,
    lang: string = "en",
  ): Promise<Uint8Array> {
    throw new Error("NotImplemented");
  }

  public async streamHtml(
    resp: NodeJS.WritableStream,
    url: string,
    lang: string = "en",
  ): Promise<StreamMetaData> {
    try {
      const metaData: StreamMetaData = {};
      await this.getStream({ url, lang }, resp, metaData);
      return metaData;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
