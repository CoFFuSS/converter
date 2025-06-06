import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  PORT: Joi.number().port().default(3000),

  DATABASE_HOST: Joi.string().required(),

  DATABASE_PORT: Joi.number().port().default(5432),

  DATABASE_USERNAME: Joi.string().required(),

  DATABASE_PASSWORD: Joi.string().required(),

  DATABASE_NAME: Joi.string().required(),

  CORS_ORIGIN: Joi.string().default('http://localhost:4200'),
});
