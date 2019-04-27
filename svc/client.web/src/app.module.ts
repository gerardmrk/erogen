import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { APP_SERVICE } from './services/app';
import { CONFIG_SERVICE } from './services/config';
import { AppService } from './services/app/service';
import { ConfigService } from './services/config/service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    { provide: APP_SERVICE, useClass: AppService },
    { provide: CONFIG_SERVICE, useClass: ConfigService },
  ],
})
export class ApplicationModule {}
