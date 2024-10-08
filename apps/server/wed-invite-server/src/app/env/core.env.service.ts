import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CoreEnvService {
  get isProduction(): boolean {
    return this.config.get<boolean>('isProduction') ?? false;
  }
  get tokenKey(): string {
    return this.config.get<string>('token_key') ?? '';
  }
  get refreshTokenKey(): string {
    return this.config.get<string>('refresh_token_key') ?? '';
  }
  constructor(@Inject(ConfigService) private config: ConfigService) {}
}
