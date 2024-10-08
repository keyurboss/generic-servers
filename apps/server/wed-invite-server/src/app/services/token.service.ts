import { Inject, Injectable } from '@nestjs/common';
import { PrivateKey, Secret, sign, SignOptions } from 'jsonwebtoken';
import { CoreEnvService } from '../env/core.env.service';
import { FirebaseService } from './firebase.service';

@Injectable()
export class TokenService {
  constructor(
    @Inject(CoreEnvService) private coreEnv: CoreEnvService,
    @Inject(FirebaseService) private fire: FirebaseService
  ) {}

  private generateToken(
    payload: string | Buffer | object,
    secretOrPrivateKey: Secret | PrivateKey,
    options?: SignOptions
  ): string {
    return sign(payload, secretOrPrivateKey, options);
  }

  generateAccessToken(data: never): string {
    return this.generateToken(data, this.coreEnv.tokenKey, {
      expiresIn: '6h',
    });
  }

  generateRefreshToken(data: never): string {
    return this.generateToken(data, this.coreEnv.tokenKey, {
      expiresIn: '1d',
    });
  }

  async getTokens(uid: string, data: never) {
    return {
      token: this.generateAccessToken(data),
      refresh_token: this.generateRefreshToken(data),
      firebase_token: await this.fire.CreateCustomToken(uid, data),
    };
  }
}
