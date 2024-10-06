import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { validationSchema } from './validation.schema';
import { DatabaseService, DbConfig } from './database';
import { DbEnvService } from './env';
import { WeddingEventController } from './wedding_events/wedding_events.controller';
import { WeddingEventService } from './wedding_events/wedding_events.service';

const controllers = [AppController, WeddingEventController];

const services = [WeddingEventService, DatabaseService];

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validationSchema,
      envFilePath: join(__dirname, 'assets', '.env'),
    }),
  ],
  controllers,
  providers: [
    AppService,
    {
      provide: DbConfig,
      useClass: DbEnvService,
    },
    ...services,
  ],
})
export class AppModule {}
