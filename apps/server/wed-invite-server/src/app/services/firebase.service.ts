import { Inject, Injectable, Logger } from '@nestjs/common';
import { CoreEnvService } from '../env/core.env.service';
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import * as admin from 'firebase-admin';

interface FirebaseConfigToplevelIterface {
  config: { [key: string]: string };
  databaseurl: string;
}

@Injectable()
export class FirebaseService {
  app!: admin.app.App;
  auth!: admin.auth.Auth;
  private logger: Logger;
  //   database!: admin.database.Database;
  //   firestore!: admin.firestore.Firestore;
  //   messaging!: admin.messaging.Messaging;
  realtimeDatabaseTime = admin.database.ServerValue.TIMESTAMP;
  realtimeDatabaseIncrement = admin.database.ServerValue.increment;
  constructor(@Inject(CoreEnvService) core: CoreEnvService) {
    this.logger = new Logger(this.constructor.name);
    const VariableFileName = join(
      ...(core.isProduction
        ? [__dirname, 'assets', 'firebase.config.json']
        : [__filename, '..', 'assets', 'firebase.config.json'])
    );
    this.logger.debug(`Getting Data From ${VariableFileName}`);
    // environment.production === true
    if (existsSync(VariableFileName) === false) {
      this.logger.error(`DB Config Not Found At ${VariableFileName}`);
      throw new Error('DB Config Not Found At ' + VariableFileName);
    }
    const c: FirebaseConfigToplevelIterface = JSON.parse(
      readFileSync(VariableFileName).toString()
    );
    this.app = admin.initializeApp({
      credential: admin.credential.cert(c.config),
      databaseURL: c.databaseurl,
    });
    this.auth = admin.auth();
    // this.database = admin.database();
    // this.firestore = admin.firestore();
    // this.messaging = admin.messaging();
  }

  CreateCustomToken(uid: string, developerClaims?: any): Promise<string> {
    return this.auth.createCustomToken(uid, developerClaims);
  }
}
