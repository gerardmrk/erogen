import { Injectable, Scope } from "@nestjs/common";
// @ts-ignore
import { renderJSON } from "dist/renderer";
import asyncModuleStats from "dist/client/async-modules.json";
import { Response } from "@renderer/engine";

@Injectable({
  scope: Scope.DEFAULT,
})
export class AppService {
  private render: ReturnType<typeof renderJSON>;

  public constructor() {
    // TODO: add cache store - publ routes
    // TODO: add cache store - priv routes

    // TODO: intercept or prevent egress API calls from renderer
    // ----> find and replace with regex: fetch?? renderer build phase only

    // TODO: test proto
    // TODO: renderer.readJSON()
    // TODO: renderer.readProto()
    this.render = renderJSON(asyncModuleStats);
  }

  public async renderPage(url: string, lang: string = "en"): Promise<Response> {
    try {
      const data = await this.render({ url, lang });
      if (!!data.error) {
        throw data.error;
      }
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
