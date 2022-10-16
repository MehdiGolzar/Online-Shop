import { load } from 'ts-dotenv';

const env = load({
  PORT: {
    type: Number,
    default: 3000,
  },
});

export const appConfig = {
  port: env.PORT,
};
