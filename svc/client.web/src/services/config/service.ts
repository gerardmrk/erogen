import { resolve, normalize } from "path";
import dotenv from "dotenv";
import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { IConfigService, IAssetsConfig } from ".";

@Injectable()
export class ConfigService implements IConfigService, OnApplicationBootstrap {
  private readonly envFile = resolve(__dirname, "../../../.env");

  // assets
  private assetsConfig: IAssetsConfig = {
    rootDir: resolve(__dirname, "../../../node_modules/@app/client.web/dist/client"), // prettier-ignore
    urlPrefix: "/assets/",
    gzip: true,
    brotli: true,
  };

  public constructor() {
    dotenv.config({ path: this.envFile });
  }

  public onApplicationBootstrap() {
    const assetsDir = process.env.CLIENT_WEB_ASSETS_ROOT_DIR;
    if (!!assetsDir) {
      this.assetsConfig.rootDir = normalize(assetsDir);
    }

    const urlPrefix = process.env.CLIENT_WEB_ASSETS_URL_PREFIX;
    if (!!urlPrefix) {
      this.assetsConfig.urlPrefix = urlPrefix;
    }

    const encodings = process.env.CLIENT_WEB_SUPPORTED_ENCODINGS;
    if (!!encodings) {
      const supportedEncodings = encodings.split(",");
      this.assetsConfig.gzip = supportedEncodings.includes("gzip");
      this.assetsConfig.brotli = supportedEncodings.includes("brotli");
    }
  }

  public assets() {
    return this.assetsConfig;
  }
}
