import { promises } from "fs";
import { NestMiddleware, Req, Res, Injectable } from "@nestjs/common";
import { SrvRequest, SrvResponse } from "..";

const { access: fsAccess } = promises;

@Injectable()
export class StaticAssetsMiddleware implements NestMiddleware {
  public use(
    @Req() req: SrvRequest,
    @Res() res: SrvResponse,
    next: () => void,
  ) {
    // if (!req.url.startsWith)
    let ext = "";
    if (req.acceptedEncodings.includes) {
      if (req.acceptedEncodings.includes("br")) ext = "br";
      if (req.acceptedEncodings.includes("gzip")) ext = "gz";
    }

    next();
  }
}
