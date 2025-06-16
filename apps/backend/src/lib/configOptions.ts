import config from '../config/config';

export const configOptions = {
  isGlobal: true,
  envFilePath: ['.env', '.env.prod'],
  load: [config],
  cache: true,
};
