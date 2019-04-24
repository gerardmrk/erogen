// import { readFile } from "fs";

import { Controller, Get, Req, Res } from "@nestjs/common";
import { AppService } from "./services/app.service";
import { FastifyRequest, FastifyReply } from "fastify";
// import { createWriteStream } from "fs";
import { StreamResponse } from "@renderer/engine/stream-engine";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get("*")
  // @Render("index.ssr.hbs")
  // public async indexHTML(@Req() req: FastifyRequest<Request>) {
  //   return await this.appService.getHtmlData(req.req.url);
  // }

  @Get("*")
  public async indexHTML(
    @Req() req: FastifyRequest<Request>,
    @Res() res: FastifyReply<StreamResponse>,
  ) {
    // const buf = Buffer.alloc(1024);
    // const writer = createWriteStream(buf);
    res.header("Content-Type", "text/html");
    this.appService.streamHtmlPage(res.res, req.req.url);
  }
}
