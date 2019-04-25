import { resolve } from "path";
import { NestFactory } from "@nestjs/core";
import hbs from "hbs";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { ApplicationModule } from "./app.module";

const assetsDir = resolve(__dirname, "../../dist/client");

(async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    ApplicationModule,
    new FastifyAdapter(),
  );

  app.setViewEngine({
    engine: hbs,
    templates: assetsDir,
  });

  app.useStaticAssets({
    root: assetsDir,
    prefix: "/assets/",
  });

  await app.listen(2700);
})();
