import { Global, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtOptions } from '../lib/jwtOption';
import { configOptions } from '../lib/configOptions';
import { TokenHelper } from '../lib/helpers/token.helper';

@Global()
@Module({
  providers: [JwtService, ConfigService, TokenHelper],
  exports: [JwtService, ConfigService, TokenHelper],
  imports: [
    ConfigModule.forRoot(configOptions),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return jwtOptions(configService);
      },
      inject: [ConfigService],
    }),
  ],
})
export class GlobalModule {}
