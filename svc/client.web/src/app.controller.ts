import { Controller, Get, Req, Render, Inject } from '@nestjs/common';
import { SrvRequest } from '../../../app/client.web/src/server';
import { IAppService, APP_SERVICE } from './services/app';
// import { FastifyRequest, FastifyReply } from "fastify";
// import { IncomingMessage, ServerResponse } from "http";

@Controller()
export class AppController {
  constructor(@Inject(APP_SERVICE) private appService: IAppService) {}

  @Get('*')
  @Render('index.ssr.hbs')
  public async indexHTML(@Req() req: SrvRequest) {
    return await this.appService.getHtmlJsonData(<string>req.url, 'en');
  }

  // @Get("*")
  // public async indexHTML(
  //   @Request() req: FastifyRequest<IncomingMessage>,
  //   @Response() res: FastifyReply<ServerResponse>,
  // ) {
  //   res.header("Content-Type", "text/html");
  //   this.appService.streamHtmlPage(res.res, req.req.url || "/");
  // }
}
