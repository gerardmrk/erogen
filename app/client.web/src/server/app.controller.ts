// import { readFile } from "fs";

import { Controller, Get, Req } from "@nestjs/common";
import { AppService } from "./services/app.service";
import { FastifyRequest } from "fastify";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  public async indexHTML(@Req() req: FastifyRequest<Request>): Promise<string> {
    const html = await this.appService.renderPage(req.req.url);
    return html;
  }
}
