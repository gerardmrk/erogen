import { Injectable } from "@nestjs/common";
import { IConfigService } from ".";

@Injectable()
export class ConfigService implements IConfigService {
  // TODO: cleanup

  public assetsDir = "/assets/";

  public constructor() {}

  public assets() {
    return {
      assetsDir: this.assetsDir,
    };
  }
}
