import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private config: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const isPublic =
        (this.reflector.get(IS_PUBLIC_KEY, context.getHandler()) ||
          this.reflector.get(IS_PUBLIC_KEY, context.getClass())) ??
        false;
      if (isPublic) return true;

      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization?.split(' ')[1];

      if (!token) {
        this.throwError('No token provided');
      }
      const decodedToken = this.jwtService.decode(token);
      if (decodedToken) {
        if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
          this.throwError('Your login has expired. Please login again.');
        }
      }
      request.user = this.jwtService.verify(token, {
        secret: this.config.get('security.jwtSecret'),
      });

      if (!request.user) {
        this.throwError('Invalid token');
      }
      return true;
    } catch (error: any) {
      this.throwError(error.message);
    }
  }

  private throwError(message: string) {
    throw new UnauthorizedException({
      message: message,
    });
  }
}
