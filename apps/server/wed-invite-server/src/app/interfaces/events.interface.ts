import * as joi from 'joi';

export type WeddingEventType = {
  event_id: number;
  event_second_id: string;
  event_name: string;
  event_starts_at: number;
  event_ends_at: number;
};

export type weddingEventWhere = {
  event_id?: number | number[];
  event_second_id?: string | string[];
  event_name?: string | string[];
  event_starts_less?: number;
  event_starts_greater?: number;
  event_ends_less?: number;
  event_ends_greater?: number;
};

export const weddingEventTable = {
  table_name: 'wedding_events',
  columns: {
    event_id: 'event_id',
    event_second_id: 'event_second_id',
    event_name: 'event_name',
    event_starts_at: 'event_starts_at',
    event_ends_at: 'event_ends_at',
  },
};

export const weddingEventValidator = {
  event_id: joi.number().required().min(1),
  event_second_id: joi.string().uuid().required(),
  event_name: joi.string().required().trim(),
  event_starts_at: joi.number().min(1728212473).max(2147483647).required(),
  event_ends_at: joi.number().min(1728212473).max(2147483647).required(),
};

export const weddingEventObjectValidator = joi.object(weddingEventValidator);
