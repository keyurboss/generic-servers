import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule, DbConfigProvider } from '@rps/nest-server-core';
import { join } from 'path';
import {
  EventManagersController,
  EventManagersService,
} from './api/event-managers';
import {
  WeddingEventController,
  WeddingEventService,
} from './api/wedding-events';
import { AppService } from './app.service';
import { DbEnvService } from './env';
import { CoreEnvService } from './env/core.env.service';
import { validationSchema } from './validation.schema';
import { FirebaseService, TokenService } from './services';

const controllers = [WeddingEventController, EventManagersController];

const services = [
  WeddingEventService,
  EventManagersService,
  TokenService,
  FirebaseService,
];

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
    CoreEnvService,
    {
      provide: DbConfigProvider,
      useClass: DbEnvService,
    },
  ],
  exports: [DbConfigProvider, CoreEnvService, ConfigModule],
})
class GlobalDataProviderModule {}

@Module({
  imports: [GlobalDataProviderModule, ...modules],
  controllers,
  providers: [AppService, ...services],
})
export class AppModule {}
