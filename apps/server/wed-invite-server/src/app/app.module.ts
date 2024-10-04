import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { validationSchema } from './validation.schema';
import { DatabaseService, DbConfig } from './database';
import { DbEnvService } from './env';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validationSchema,
      envFilePath: join(__dirname, 'assets', '.env'),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: DbConfig,
      useClass: DbEnvService,
    },
    DatabaseService,
  ],
})
export class AppModule {}
