import { Injectable, Scope } from "@nestjs/common";

@Injectable({
  scope: Scope.DEFAULT
})
export class AppService {
  public constructor() {}

  renderPage() {}
}
