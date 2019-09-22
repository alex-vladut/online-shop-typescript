import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { Role } from '../auth/role';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    if (this.isPublic(context)) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest<Request>();
    const authorizedRoles = this.getAuthorizedRoles(context);
    return (
      authorizedRoles &&
      authorizedRoles.length &&
      user.roles &&
      user.roles.length &&
      authorizedRoles.some(role => user.roles.includes(role))
    );
  }

  private isPublic(context: ExecutionContext) {
    return this.reflector.get<boolean>('isPublic', context.getHandler());
  }

  /**
   * Extract authorized roles either from the method or the class decorated with Authorize
   */
  private getAuthorizedRoles(context: ExecutionContext) {
    return (
      this.reflector.get<Role[]>('roles', context.getHandler()) ||
      this.reflector.get<Role[]>('roles', context.getClass())
    );
  }
}
