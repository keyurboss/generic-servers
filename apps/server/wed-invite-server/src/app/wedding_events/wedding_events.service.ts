import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '@rps/nest-server-core';
import {
  WeddingEventType,
  weddingEventWhere,
  weddingEventTable,
} from '../interfaces';

@Injectable()
export class WeddingEventService {
  logger!: Logger;
  constructor(private dbService: DatabaseService) {
    this.logger = new Logger(this.constructor.name);
  }

  async getWeddingEvents(
    where?: weddingEventWhere
  ): Promise<Array<WeddingEventType>> {
    this.logger.debug(`getWeddingEvents where: ${JSON.stringify(where)}`);
    this.logger.debug('Getting Connection');
    const db = await this.dbService.getDb();
    try {
      if (where) {
        if (where.event_id) {
          if (Array.isArray(where.event_id)) {
            if (where.event_id.length > 0) {
              db.where_in(weddingEventTable.columns.event_id, where.event_id);
            }
          } else {
            db.where(weddingEventTable.columns.event_id, where.event_id);
          }
        }

        if (where.event_second_id) {
          if (Array.isArray(where.event_second_id)) {
            if (where.event_second_id.length > 0) {
              db.where_in(
                weddingEventTable.columns.event_second_id,
                where.event_second_id
              );
            }
          } else {
            db.where(
              weddingEventTable.columns.event_second_id,
              where.event_second_id
            );
          }
        }

        if (where.event_name) {
          if (Array.isArray(where.event_name)) {
            if (where.event_name.length > 0) {
              db.where_in(
                weddingEventTable.columns.event_name,
                where.event_name
              );
            }
          } else {
            db.where(weddingEventTable.columns.event_name, where.event_name);
          }
        }
        if (where.event_short_name) {
          if (Array.isArray(where.event_short_name)) {
            if (where.event_short_name.length > 0) {
              db.where_in(
                weddingEventTable.columns.event_short_name,
                where.event_short_name
              );
            }
          } else {
            db.where(
              weddingEventTable.columns.event_short_name,
              where.event_short_name
            );
          }
        }

        if (where.event_starts_less) {
          db.where(
            `${weddingEventTable.columns.event_starts_at} <`,
            where.event_starts_less
          );
        }
        if (where.event_starts_greater) {
          db.where(
            `${weddingEventTable.columns.event_starts_at} >`,
            where.event_starts_greater
          );
        }
        if (where.event_ends_less) {
          db.where(
            `${weddingEventTable.columns.event_ends_at} <`,
            where.event_ends_less
          );
        }
        if (where.event_ends_greater) {
          db.where(
            `${weddingEventTable.columns.event_ends_at} >`,
            where.event_ends_greater
          );
        }
      }

      const result = await db.get(weddingEventTable.table_name);
      this.logger.debug(`GetWeddingEvents result ${result}`);
      return result;
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      this.logger.debug('Releasing Connection');
      db.release();
    }
  }

  async insertWeddingEvents(data: WeddingEventType) {
    this.logger.debug(`insertWeddingEvents data: ${JSON.stringify(data)}`);
    this.logger.debug('Getting Connection');
    const db = await this.dbService.getDb();
    try {
      data.event_id = null as never;
      const result = await db.insert(weddingEventTable.table_name, data);
      this.logger.debug(`insertWeddingEvents result ${JSON.stringify(result)}`);
      data.event_id = result.insertId;
      return data;
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      this.logger.debug('Releasing Connection');
      db.release();
    }
  }

  async updateWeddingEvents(data: WeddingEventType) {
    this.logger.debug(`updateWeddingEvents data: ${JSON.stringify(data)}`);
    this.logger.debug('Getting Connection');
    const db = await this.dbService.getDb();
    try {
      const event_id = data.event_id;
      data.event_id = null as never;
      const result = await db
        .where(weddingEventTable.columns.event_second_id, data.event_second_id)
        .update(weddingEventTable.table_name, data);
      this.logger.debug(`updateWeddingEvents result ${JSON.stringify(result)}`);
      data.event_id = event_id;
      return data;
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      this.logger.debug('Releasing Connection');
      db.release();
    }
  }

  async deleteWeddingEvents(data: WeddingEventType) {
    this.logger.debug(`deleteWeddingEvents data: ${JSON.stringify(data)}`);
    this.logger.debug('Getting Connection');
    const db = await this.dbService.getDb();
    try {
      const result = await db
        .where(weddingEventTable.columns.event_second_id, data.event_second_id)
        .delete(weddingEventTable.table_name);
      this.logger.debug(`deleteWeddingEvents result ${JSON.stringify(result)}`);
      return data;
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      this.logger.debug('Releasing Connection');
      db.release();
    }
  }
}
