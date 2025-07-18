import { Global, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtOptions } from '../lib/jwtOption';
import { configOptions } from '../lib/configOptions';
import { TokenHelper } from '../lib/helpers/token.helper';
import { FileUploadHelper } from '../lib/helpers/fileUpload.helper';

@Global()
@Module({
  providers: [JwtService, ConfigService, TokenHelper, FileUploadHelper],
  exports: [JwtService, ConfigService, TokenHelper, FileUploadHelper],
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
