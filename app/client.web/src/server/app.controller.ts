import { Controller, Get, Request, Response } from "@nestjs/common";
import { AppService } from "./services/app.service";
import { FastifyRequest, FastifyReply } from "fastify";
// import { createWriteStream } from "fs";
import { IncomingMessage, ServerResponse } from "http";

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
    @Request() req: FastifyRequest<IncomingMessage>,
    @Response() res: FastifyReply<ServerResponse>,
  ) {
    res.header("Content-Type", "text/html");
    this.appService.streamHtmlPage(res.res, req.req.url || "/");
  }
}

// FastifyRequest<ClientRequest/Request>
// ["body", "headers", "hostname", "ip", "ips", "log", "params", "query", "raw"];
