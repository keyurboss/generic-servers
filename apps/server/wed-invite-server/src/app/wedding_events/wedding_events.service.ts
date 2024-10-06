import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../database';
import { WeddingEventsWhere, WeddingEventTable } from '../interfaces';

@Injectable()
export class WeddingEventService {
  logger!: Logger;
  constructor(private dbService: DatabaseService) {
    this.logger = new Logger(this.constructor.name);
  }

  async getWeddingEvents(where?: WeddingEventsWhere) {
    this.logger.debug(`getWeddingEvents where: ${JSON.stringify(where)}`);
    this.logger.debug('Getting Connection');
    const db = await this.dbService.getDb();
    try {
      if (where) {
        if (where.event_id) {
          if (Array.isArray(where.event_id)) {
            if (where.event_id.length > 0) {
              db.where_in(WeddingEventTable.columns.event_id, where.event_id);
            }
          } else {
            db.where(WeddingEventTable.columns.event_id, where.event_id);
          }
        }

        if (where.event_second_id) {
          if (Array.isArray(where.event_second_id)) {
            if (where.event_second_id.length > 0) {
              db.where_in(
                WeddingEventTable.columns.event_second_id,
                where.event_second_id
              );
            }
          } else {
            db.where(
              WeddingEventTable.columns.event_second_id,
              where.event_second_id
            );
          }
        }

        if (where.event_name) {
          if (Array.isArray(where.event_name)) {
            if (where.event_name.length > 0) {
              db.where_in(
                WeddingEventTable.columns.event_name,
                where.event_name
              );
            }
          } else {
            db.where(WeddingEventTable.columns.event_name, where.event_name);
          }
        }

        if (where.event_starts_less) {
          db.where(
            `${WeddingEventTable.columns.event_starts_at} <`,
            where.event_starts_less
          );
        }
        if (where.event_starts_greater) {
          db.where(
            `${WeddingEventTable.columns.event_starts_at} >`,
            where.event_starts_greater
          );
        }
        if (where.event_ends_less) {
          db.where(
            `${WeddingEventTable.columns.event_ends_at} <`,
            where.event_ends_less
          );
        }
        if (where.event_ends_greater) {
          db.where(
            `${WeddingEventTable.columns.event_ends_at} >`,
            where.event_ends_greater
          );
        }
      }
      
      const result = await db.get(WeddingEventTable.table_name);
      this.logger.debug(`GetWeddingEvents result ${result}`);
      return result;
    } catch (error) {
      this.logger.error(error);
    } finally {
      this.logger.debug('Releasing Connection');
      db.release();
    }
  }
}
