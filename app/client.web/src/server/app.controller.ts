// import { readFile } from "fs";

import { Controller, Get, Req, Render } from "@nestjs/common";
import { AppService } from "./services/app.service";
import { FastifyRequest } from "fastify";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("*")
  @Render("index.ssr.hbs")
  public async indexHTML(@Req() req: FastifyRequest<Request>) {
    return await this.appService.renderPage(req.req.url);
  }
}
