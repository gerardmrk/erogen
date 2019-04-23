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
