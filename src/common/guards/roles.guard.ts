import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { USER_ROLES } from 'src/modules/users/user.constant';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<USER_ROLES[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest<Request>();

    if (!user) throw new UnauthorizedException('Authentication required');

    if (!requiredRoles.some((role) => user.role === role))
      throw new ForbiddenException(
        `Requires one of roles : ${requiredRoles.join(',')}`,
      );

    return true;
  }
}
