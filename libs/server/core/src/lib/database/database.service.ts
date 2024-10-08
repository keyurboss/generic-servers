import { Inject, Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Pool } from 'query-builder-mysql';
import { DbConfig, DbConfigProvider } from './db-config.class';

@Injectable()
export class DatabaseService {
  private dbPool!: Pool;
  private logger: Logger;
  constructor(@Inject(DbConfigProvider) db: DbConfig) {
    this.logger = new Logger(this.constructor.name);
    this.dbPool = new Pool({
      host: db.host,
      port: db.port,
      connectionLimit: 5,
      user: db.username,
      password: db.password,
      database: db.database,
      bigIntAsNumber: true,
      insertIdAsNumber: true,
      decimalAsNumber: true,
    });
    this.logger.log('Db Pool Service Initialized');
    this.logger.debug(`Connecting to db ${this.dbPool.databasestring}`);
  }

  getDb() {
    return this.dbPool.get_connection();
  }
}
