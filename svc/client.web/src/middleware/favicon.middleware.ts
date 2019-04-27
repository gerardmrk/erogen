import { NestMiddleware, Req, Res, Injectable } from "@nestjs/common";
import { SrvRequest, SrvResponse } from "..";

const CACHE_MAX_AGE = 86400000 * 365; // 1yr in ms
const DFLT_FAVICON_PATH = "/favicon.ico";

@Injectable()
export class FaviconMiddleware implements NestMiddleware {
  public constructor() {}

  public use(
    @Req() req: SrvRequest,
    @Res() res: SrvResponse,
    next: () => void,
  ) {
    if (req.url !== DFLT_FAVICON_PATH) {
      return next();
    }

    res.status(200);
    res.headers({
      "Content-Type": "image/x-icon",
      "Content-Length": 12,
      "Cache-Control": `public, max-age=${Math.floor(CACHE_MAX_AGE / 1000)}`,
    });
  }
}
