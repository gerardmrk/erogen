import { resolve } from "path";
import { NestFactory } from "@nestjs/core";
import hbs from "hbs";
import {
  FastifyAdapter,
  NestFastifyApplication
} from "@nestjs/platform-fastify";
import { ApplicationModule } from "./app.module";

const assetsDir = resolve(__dirname, "../../dist/client");

(async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    ApplicationModule,
    new FastifyAdapter()
  );

  app.useStaticAssets({ root: assetsDir, prefix: "/assets/" });

  app.setViewEngine({
    engine: hbs,
    templates: assetsDir
  });

  await app.listen(2700);
})();
