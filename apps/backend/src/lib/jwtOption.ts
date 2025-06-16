import { ConfigService } from '@nestjs/config';
import { tokenExpiry } from './const/appConstants';

export const jwtOptions = (config: ConfigService) => {
  return {
    globale: true,
    secret: config.get('security.jwtSecret'),
    signOptions: {
      expiresIn: tokenExpiry,
    },
  };
};
