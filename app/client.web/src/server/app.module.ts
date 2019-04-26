import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
// import { StaticAssetsMiddleware } from "./middleware/static-assets.middleware";
import { ConfigService } from "./services/config/service";
import { CONFIG_SERVICE } from "./services/config";
import { APP_SERVICE } from "./services/app";
import { AppService } from "./services/app/service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    { provide: APP_SERVICE, useClass: AppService },
    { provide: CONFIG_SERVICE, useClass: ConfigService },
  ],
})
export class ApplicationModule {
  // public configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(StaticAssetsMiddleware).forRoutes("*");
  // }
}
