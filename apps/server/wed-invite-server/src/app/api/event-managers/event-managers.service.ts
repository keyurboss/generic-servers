import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '@rps/nest-server-core';
import {
  EventManagersTable,
  EventManagersType,
  EventManagersWhere,
} from '../../interfaces';

@Injectable()
export class EventManagersService {
  logger!: Logger;
  constructor(private dbService: DatabaseService) {
    this.logger = new Logger(this.constructor.name);
  }

  async getEventManagers(
    where?: EventManagersWhere
  ): Promise<Array<EventManagersType>> {
    this.logger.debug(`getEventManagers where: ${JSON.stringify(where)}`);
    this.logger.debug('Getting Connection');
    const db = await this.dbService.getDb();
    try {
      if (where) {
        if (where.em_id) {
          if (Array.isArray(where.em_id)) {
            if (where.em_id.length > 0) {
              db.where_in(EventManagersTable.columns.em_id, where.em_id);
            }
          } else {
            db.where(EventManagersTable.columns.em_id, where.em_id);
          }
        }
        if (where.em_event_second_id) {
          if (Array.isArray(where.em_event_second_id)) {
            if (where.em_event_second_id.length > 0) {
              db.where_in(
                EventManagersTable.columns.em_event_second_id,
                where.em_event_second_id
              );
            }
          } else {
            db.where(
              EventManagersTable.columns.em_event_second_id,
              where.em_event_second_id
            );
          }
        }
        if (where.em_user_name) {
          if (Array.isArray(where.em_user_name)) {
            if (where.em_user_name.length > 0) {
              db.where_in(
                EventManagersTable.columns.em_user_name,
                where.em_user_name
              );
            }
          } else {
            db.where(
              EventManagersTable.columns.em_user_name,
              where.em_user_name
            );
          }
        }
        if (where.em_password) {
          if (Array.isArray(where.em_password)) {
            if (where.em_password.length > 0) {
              db.where_in(
                EventManagersTable.columns.em_password,
                where.em_password
              );
            }
          } else {
            db.where(EventManagersTable.columns.em_password, where.em_password);
          }
        }
        if (where.em_name) {
          if (Array.isArray(where.em_name)) {
            if (where.em_name.length > 0) {
              db.where_in(EventManagersTable.columns.em_name, where.em_name);
            }
          } else {
            db.where(EventManagersTable.columns.em_name, where.em_name);
          }
        }
        if (where.em_number) {
          if (Array.isArray(where.em_number)) {
            if (where.em_number.length > 0) {
              db.where_in(
                EventManagersTable.columns.em_number,
                where.em_number
              );
            }
          } else {
            db.where(EventManagersTable.columns.em_number, where.em_number);
          }
        }
        if (where.em_type) {
          if (Array.isArray(where.em_type)) {
            if (where.em_type.length > 0) {
              db.where_in(EventManagersTable.columns.em_type, where.em_type);
            }
          } else {
            db.where(EventManagersTable.columns.em_type, where.em_type);
          }
        }
        if (where.em_type) {
          if (Array.isArray(where.em_type)) {
            if (where.em_type.length > 0) {
              db.where_in(EventManagersTable.columns.em_type, where.em_type);
            }
          } else {
            db.where(EventManagersTable.columns.em_type, where.em_type);
          }
        }
      }

      const result = await db.get(EventManagersTable.table_name);
      this.logger.debug(`Event Managers result ${result}`);
      return result;
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      this.logger.debug('Releasing Connection');
      db.release();
    }
  }

  async insertEventManagers(data: EventManagersType) {
    this.logger.debug(`insert Event Managers data: ${JSON.stringify(data)}`);
    this.logger.debug('Getting Connection');
    const db = await this.dbService.getDb();
    try {
      data.em_id = null as never;
      const result = await db.insert(EventManagersTable.table_name, data);
      this.logger.debug(`insertEventManagers result ${JSON.stringify(result)}`);
      data.em_id = result.insertId;
      return data;
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      this.logger.debug('Releasing Connection');
      db.release();
    }
  }

  async updateEventManagers(data: EventManagersType) {
    this.logger.debug(`update Event Managers data: ${JSON.stringify(data)}`);
    this.logger.debug('Getting Connection');
    const db = await this.dbService.getDb();
    try {
      const event_id = data.em_id;
      data.em_id = null as never;
      const result = await db
        .where(
          EventManagersTable.columns.em_event_second_id,
          data.em_event_second_id
        )
        .update(EventManagersTable.table_name, data);
      this.logger.debug(
        `update EventManagers result ${JSON.stringify(result)}`
      );
      data.em_id = event_id;
      return data;
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      this.logger.debug('Releasing Connection');
      db.release();
    }
  }

  async deleteEventManagers(data: EventManagersType) {
    this.logger.debug(`deleteEventManagers data: ${JSON.stringify(data)}`);
    this.logger.debug('Getting Connection');
    const db = await this.dbService.getDb();
    try {
      const result = await db
        .where(
          EventManagersTable.columns.em_event_second_id,
          data.em_event_second_id
        )
        .delete(EventManagersTable.table_name);
      this.logger.debug(`deleteEventManagers result ${JSON.stringify(result)}`);
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
