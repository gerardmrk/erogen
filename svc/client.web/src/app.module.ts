import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { AppController } from "./app.controller";
import { APP_SERVICE } from "./services/app";
import { CONFIG_SERVICE } from "./services/config";
import { AppService } from "./services/app/service";
import { ConfigService } from "./services/config/service";
import { StaticAssetsMiddleware } from "./middleware/static-assets.middleware";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    { provide: APP_SERVICE, useClass: AppService },
    { provide: CONFIG_SERVICE, useClass: ConfigService },
  ],
})
export class ApplicationModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // consumer.apply(StaticAssetsMiddleware).forRoutes("*");
  }
}
