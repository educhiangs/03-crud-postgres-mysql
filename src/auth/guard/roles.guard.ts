import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLER_KEY } from '../decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.getAllAndOverride<Role>(ROLER_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!role) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (user.role === Role.ADMIN) {
      return true;
    }

    return role === user.role;
  }
}
