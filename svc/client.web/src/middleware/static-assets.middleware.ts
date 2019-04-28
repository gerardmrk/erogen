import { promises, constants, createReadStream } from "fs";
import { NestMiddleware, Req, Res, Injectable, Inject, HttpException } from "@nestjs/common"; // prettier-ignore
import mime from "mime-types";
import { SrvRequest, SrvResponse } from "..";
import { IConfigService, CONFIG_SERVICE } from "src/services/config";
import { parseCNHeader } from "src/utils/parse-cn-header";
import { extname } from "path";

const statAsync = promises.stat;
const accessAsync = promises.access;

@Injectable()
export class StaticAssetsMiddleware implements NestMiddleware {
  private rootDir: string;
  private urlPrefix: string;
  private gzip: boolean;
  private brotli: boolean;
  private prefixLn: number;
  private pathsCache: Map<string, boolean>;

  public constructor(
    @Inject(CONFIG_SERVICE) private configService: IConfigService,
  ) {
    const assetsConf = configService.assets();

    this.rootDir = assetsConf.rootDir;
    this.urlPrefix = assetsConf.urlPrefix;
    this.gzip = assetsConf.gzip;
    this.brotli = assetsConf.brotli;
    this.prefixLn = this.urlPrefix.length;
    this.pathsCache = new Map<string, boolean>();
  }

  public async use(
    @Req() req: SrvRequest,
    @Res() res: SrvResponse,
    next: () => void,
  ) {
    if (!req.url.startsWith(this.urlPrefix)) {
      return next();
    }

    try {
      let assetPath = `${this.rootDir}/${req.url.substr(this.prefixLn)}`;

      const acceptedEncodings = parseCNHeader(req.headers["accept-encoding"]);

      res.statusCode = 200;

      if (
        this.brotli &&
        acceptedEncodings.qfactors.has("br") &&
        (this.pathsCache.has(`${assetPath}.br`) ||
          (await existsAsync(`${assetPath}.br`)))
      ) {
        assetPath = `${assetPath}.br`;
        res.setHeader("Content-Encoding", "br");
      } else if (
        this.gzip &&
        acceptedEncodings.qfactors.has("gzip") &&
        (this.pathsCache.has(`${assetPath}.gz`) ||
          (await existsAsync(`${assetPath}.gz`)))
      ) {
        assetPath = `${assetPath}.gz`;
        res.setHeader("Content-Encoding", "gzip");
      } else if (
        acceptedEncodings.qfactors.get("identity") !== 0 ||
        acceptedEncodings.qfactors.get("*") !== 0
      ) {
        res.setHeader("Content-Encoding", "identity");
      } else {
        throw new HttpException("Not Acceptable", 406);
      }

      const stats = await statAsync(assetPath);
      res.statusCode = 200;
      res.setHeader("Content-Length", stats.size);
      res.setHeader(
        "Content-Type",
        mime.lookup(extname(req.url)) || "application/octet-stream",
      );

      if (!this.pathsCache.has(assetPath)) {
        this.pathsCache.set(assetPath, true);
      }

      const stream = createReadStream(assetPath, "utf8");

      return stream.pipe(res);
    } catch (err) {
      return (res.statusCode = 500);
    }
  }
}

async function existsAsync(fpath): Promise<boolean> {
  try {
    await accessAsync(fpath, constants.R_OK);
    return true;
  } catch (err) {
    return false;
  }
}
