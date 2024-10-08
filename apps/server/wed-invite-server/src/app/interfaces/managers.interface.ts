import * as joi from 'joi';

export type EventManagersType = {
  em_id: number;
  em_event_second_id: string;
  em_user_name: string;
  em_password: string;
  em_name: string;
  em_number: string;
  em_type: number;
  em_permissions: string;
  em_created_at: number;
  em_modified_at: number;
};
export type EventManagersWhere = {
  em_id?: number | number[];
  em_event_second_id?: string | string[];
  em_user_name?: string | string[];
  em_password?: string | string[];
  em_name?: string | string[];
  em_number?: string | string[];
  em_type?: number | number[];
  em_permissions?: string | string[];
  em_created_at?: number | number[];
  em_modified_at?: number | number[];
};

export const EventManagersTable = {
  table_name: 'event_managers',
  columns: {
    em_id: 'em_id',
    em_event_second_id: 'em_event_second_id',
    em_user_name: 'em_user_name',
    em_password: 'em_password',
    em_name: 'em_name',
    em_number: 'em_number',
    em_type: 'em_type',
    em_permissions: 'em_permissions',
    em_created_at: 'em_created_at',
    em_modified_at: 'em_modified_at',
  },
};

export const EventManagersValidator = {
  em_id: joi.number().required().min(1),
  em_event_second_id: joi.string().uuid().required(),
  em_user_name: joi.string().required().trim(),
  em_password: joi.string().required().trim(),
  em_name: joi.string().required().trim(),
  em_number: joi.string().required().trim(),
  em_type: joi.number().required().min(1),
  em_permissions: joi.string().required().trim(),
  em_created_at: joi.number().required().min(1728212473).max(2147483647),
  em_modified_at: joi.number().required().min(1728212473).max(2147483647),
};
export const eventManagersObjectValidator = joi.object(EventManagersValidator);
