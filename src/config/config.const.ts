import { load } from 'ts-dotenv';

const env = load({
  PORT: {
    type: Number,
    default: 3000,
  },

  JWT_SECRET: {
    type: String,
    default: '%T@p$ecret%',
  },

  JWT_EXPIRE_TIME: {
    type: String,
    default: '30d',
  },

  POSTGRES_NAME: {
    type: String,
    default: 'online-shop',
  },

  POSTGRES_HOST: {
    type: String,
    default: '127.0.0.1',
  },

  POSTGRES_PORT: {
    type: Number,
    default: 5435,
  },

  POSTGRES_USERNAME: {
    type: String,
    default: 'postgres',
  },

  POSTGRES_PASSWORD: {
    type: String,
    default: 'postgres',
  },

  REDIS_NAME: {
    type: String,
    default: 'online-shop',
  },

  REDIS_HOST: {
    type: String,
    default: '127.0.0.1',
  },

  REDIS_PORT: {
    type: Number,
    default: 6379,
  },

  SMS_PANEL_API_KEY: {
    type: String,
    default:
      '6D6A5539734B67676C7365506672586D33665257424E3947526C6A706F43772B466A3650686758465972453D',
  },

  SMS_PANEL_OTP_PATTERN: {
    type: String,
    default: 'Verify',
  },

  SMS_PANEL_OTP_EXPIRE_TIME: {
    type: Number,
    default: 2 * 60,
  },

  SUPER_ADMIN_USERNAME: {
    type: String,
    default: 'super_admin',
  },

  SUPER_ADMIN_PASSWORD: {
    type: String,
    default: '123456qaz',
  },

  SUPER_ADMIN_FULLNAME: {
    type: String,
    default: 'Super Admin',
  },
});

export class ConfigConstant {
  static readonly app = {
    port: env.PORT,
  };

  static readonly postgres = {
    db: env.POSTGRES_NAME,
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
    username: env.POSTGRES_USERNAME,
    password: env.POSTGRES_PASSWORD,
  };

  static readonly jwt = {
    secretKey: env.JWT_SECRET,
    expireTime: env.JWT_EXPIRE_TIME,
  };

  static readonly redis = {
    name: env.REDIS_NAME,
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
  };

  static readonly smsPanel = {
    apiKey: env.SMS_PANEL_API_KEY,
    otp: {
      pattern: env.SMS_PANEL_OTP_PATTERN,
      expireTime: env.SMS_PANEL_OTP_EXPIRE_TIME,
    },
  };

  static readonly superAdmin = {
    username: env.SUPER_ADMIN_USERNAME,
    password: env.SUPER_ADMIN_PASSWORD,
    fullname: env.SUPER_ADMIN_FULLNAME,
  };
}
