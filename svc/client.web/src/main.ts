import { resolve } from 'path';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'; // prettier-ignore
import hbs from 'hbs';
import { ApplicationModule } from './app.module';

const assetsDir = resolve(
  __dirname,
  '..',
  'node_modules/@app/client.web/dist/client',
);

(async function bootstrap() {
  // configure NestJS to use Fastify instead of Express
  const app = await NestFactory.create<NestFastifyApplication>(
    ApplicationModule,
    new FastifyAdapter(),
  );

  app.useStaticAssets({ root: assetsDir, prefix: '/assets/' });

  // use Handlebars for the view engine
  app.setViewEngine({
    engine: hbs,
    templates: assetsDir,
  });

  await app.listen(2700);
})();
