import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule, DbConfigProvider } from '@rps/nest-server-core';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbEnvService } from './env';
import { validationSchema } from './validation.schema';
import { WeddingEventController } from './wedding_events/wedding_events.controller';
import { WeddingEventService } from './wedding_events/wedding_events.service';

const controllers = [AppController, WeddingEventController];

const services = [WeddingEventService];

const modules = [DatabaseModule];

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validationSchema,
      envFilePath: join(__dirname, 'assets', '.env'),
    }),
  ],
  providers: [
    {
      provide: DbConfigProvider,
      useClass: DbEnvService,
    },
  ],
  exports: [DbConfigProvider, ConfigModule],
})
class GlobalDataProviderModule {}

@Module({
  imports: [GlobalDataProviderModule, ...modules],
  controllers,
  providers: [AppService, ...services],
})
export class AppModule {}
