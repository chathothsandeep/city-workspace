import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import AuthRepo from './auth.repo';
import { HttpErrorHelper } from '../../lib/helpers/httpError.helper';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import {
  CreateUserDto,
  TokenEntity,
  UserEntity,
} from '@city-workspace/shared-models';
import { tokenExpiry } from '../../lib/const/appConstants';
import { ConfigService } from '@nestjs/config';
import { LogHelper } from '../../lib/helpers/log.helper';

@Injectable()
export class AuthService {
  constructor(
    private repo: AuthRepo,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signIn(email: string, pass: string): Promise<UserEntity | null> {
    let finalUser;
    try {
      const user = await this.repo.login(email);
      if (!user) throw new UnauthorizedException('User not found');

      const isPasswordValid = await bcrypt.compare(pass, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException(
          "Password doesn't match with our records",
        );
      }

      if (!user.tokens || user.tokens.length === 0) {
        finalUser = await this.tokenSigning(user);
      } else if (user.tokens[0].expirestAt < new Date(Date.now())) {
        await this.repo.deleteToken(user.tokens[0].id);
        finalUser = await this.tokenSigning(user);
      } else {
        finalUser = user;
      }
      const { password, ...rest } = finalUser;
      return rest;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }

  private async tokenSigning(user: UserEntity) {
    let token;
    token = await this.jwtService.signAsync(user, {
      secret: this.config.get('security.jwtSecret'),
      expiresIn: tokenExpiry,
    });
    const tokenEntity: TokenEntity = {
      token: token,
      userId: user.id,
      expirestAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    };
    const tokenOnFromDb = await this.repo.createToken(tokenEntity);
    user.tokens?.splice(0, user.tokens?.length);
    user.tokens?.push(tokenOnFromDb);
    return user;
  }

  async signUp(createUserDto: CreateUserDto): Promise<UserEntity | null> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const newUser = await this.repo.signUp(createUserDto, hashedPassword);
      if (!newUser) {
        throw new HttpException('Sign Up Failed', HttpStatus.BAD_REQUEST);
      }
      const { password, ...result } = newUser;
      return result;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }

  getPayload(token: string) {
    const payload = this.jwtService.decode(token);
    LogHelper.getInstance().log(payload, 'payload');
    return payload;
  }

  getToken(req: any) {
    return req.headers.authorization?.split(' ')[1];
  }
}
