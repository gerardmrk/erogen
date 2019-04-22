// import { readFile } from "fs";

import { Controller, Get, Req, Render } from "@nestjs/common";
import { AppService } from "./services/app.service";
import { FastifyRequest } from "fastify";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  @Render("index.hbs")
  public async indexHTML(@Req() req: FastifyRequest<Request>) {
    const {
      metas,
      links,
      styles,
      app,
      scripts,
      initialState
    } = await this.appService.renderPage(req.req.url);
    return {
      metas,
      links,
      styles,
      app,
      scripts,
      initialState
    };
  }
}
