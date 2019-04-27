import { resolve } from 'path';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'; // prettier-ignore
import hbs from 'hbs';
import { ApplicationModule } from './app.module';

(async function bootstrap() {
  // configure NestJS to use Fastify instead of Express
  const app = await NestFactory.create<NestFastifyApplication>(
    ApplicationModule,
    new FastifyAdapter(),
  );

  // use Handlebars for the view engine
  app.setViewEngine({
    engine: hbs,
    templates: resolve(__dirname, '../../../app/client.web/dist/client'),
  });

  await app.listen(2700);
})();
