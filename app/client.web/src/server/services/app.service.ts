import { Injectable, Scope } from "@nestjs/common";
// @ts-ignore
import { renderJSON } from "dist/renderer";
import asyncModuleStats from "dist/client/async-modules.json";

@Injectable({
  scope: Scope.DEFAULT
})
export class AppService {
  private render: ReturnType<typeof renderJSON>;

  public constructor() {
    this.render = renderJSON(asyncModuleStats);
  }

  public async renderPage(url: string, lang: string = "en") {
    const data = await this.render({ url, lang });
    return JSON.stringify(data);
  }
}
