import { Controller, Get, Req, Inject, Res } from '@nestjs/common';
import { IAppService, APP_SERVICE } from './services/app';
import { SrvRequest, SrvResponse } from 'src';

@Controller()
export class AppController {
  constructor(@Inject(APP_SERVICE) private appService: IAppService) {}

  @Get('*')
  public async indexHTML(@Req() req: SrvRequest, @Res() res: SrvResponse) {
    const html = await this.appService.renderHTML(req.req.url, 'en');
    return res.headers({ 'Content-Type': 'text/html' }).send(html);
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
