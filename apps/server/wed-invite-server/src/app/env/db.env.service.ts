import { Inject, Injectable } from '@nestjs/common';
import { DbConfig } from '@rps/nest-server-core';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DbEnvService implements DbConfig {
  get host(): string {
    return this.config.get<string>('db_host') ?? '';
  }
  get port(): number {
    return this.config.get<number>('db_port') ?? 0;
  }
  get username(): string {
    return this.config.get<string>('db_user') ?? '';
  }
  get password(): string {
    return this.config.get<string>('db_password') ?? '';
  }
  get database(): string {
    return this.config.get<string>('db_database') ?? '';
  }
  constructor(@Inject(ConfigService) private config: ConfigService) {}
}
