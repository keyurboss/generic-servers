import * as joi from 'joi';

export const validationSchema = joi.object({
  isProduction: joi.boolean().default(false),
  token_key: joi.string().required().length(120).trim(),
  refresh_token_key: joi.string().required().length(120).trim(),
  db_host: joi.string().hostname().required().trim(),
  db_user: joi.string().required().trim(),
  db_database: joi.string().required().trim(),
  db_password: joi.string().required().trim(),
  db_port: joi.number().port().required(),
});
