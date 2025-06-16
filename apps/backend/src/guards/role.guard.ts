import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { LogHelper } from '../lib/helpers/log.helper';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const requiredRoles =
        this.reflector.get<string[]>(ROLES_KEY, context.getHandler()) ||
        this.reflector.get<string[]>(ROLES_KEY, context.getClass());

      if (!requiredRoles) {
        throw new HttpException('Roles not found', 400);
      }

      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException();
      }
      request.user = this.jwtService.decode(token);
      return requiredRoles.includes(request.user.role);
    } catch (error) {
      LogHelper.getInstance().log(error.message, RolesGuard.name);
      throw new HttpException(error.message, error.status);
    }
  }
}
