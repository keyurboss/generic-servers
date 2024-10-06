import { Module, Global } from '@nestjs/common';
import { DatabaseModule } from './database';

@Global()
@Module({
  imports: [DatabaseModule],
  // controllers: [],
  // providers: [],
  exports: [DatabaseModule],
})
export class ServerCoreModule {}
