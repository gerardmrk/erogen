import { Module, MiddlewareConsumer } from "@nestjs/common";
import { ServeStaticMiddleware } from "@nest-middlewares/serve-static";
import { AppController } from "./app.controller";
import { AppService } from "./services/app.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService]
})
export class ApplicationModule {
  public configure(consumer: MiddlewareConsumer) {
    ServeStaticMiddleware.configure("/assets/", {
      dotfiles: "deny"
    });

    consumer.apply(ServeStaticMiddleware);
  }
}
