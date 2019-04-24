import { Injectable, Scope } from "@nestjs/common";
// @ts-ignore
import { jsonRenderer, htmlStreamer } from "dist/renderer";
import asyncModuleStats from "dist/client/async-modules.json";
import { RenderResponse } from "@renderer/engine/render-engine";
import { RenderJsonFn, StreamHtmlFn } from "@renderer/index";
import { StreamMetaData } from "@renderer/engine/stream-engine";

@Injectable({
  scope: Scope.DEFAULT,
})
export class AppService {
  private renderJSON: RenderJsonFn;
  private streamHTML: StreamHtmlFn;

  public constructor() {
    // TODO: add cache store - publ routes
    // TODO: add cache store - priv routes

    // TODO: intercept or prevent egress API calls from renderer
    // ----> find and replace with regex: fetch?? renderer build phase only

    // TODO: test proto
    // TODO: renderer.readJSON()
    // TODO: renderer.readProto()
    this.renderJSON = jsonRenderer(asyncModuleStats);
    this.streamHTML = htmlStreamer(asyncModuleStats);
  }

  public async getHtmlData(
    url: string,
    lang: string = "en",
  ): Promise<RenderResponse> {
    try {
      const data = await this.renderJSON({ url, lang });
      if (!!data.error) throw data.error;
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  public async streamHtmlPage(
    resp: NodeJS.WritableStream,
    url: string,
    lang: string = "en",
  ): Promise<void> {
    try {
      const metaData: StreamMetaData = {};
      await this.streamHTML({ url, lang }, resp, metaData);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
