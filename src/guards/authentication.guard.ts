import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { authenticate } from 'passport';

import { UserInfo } from '../auth/user-info';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const [request, response] = [
      context.switchToHttp().getRequest(),
      context.switchToHttp().getResponse(),
    ];
    const user = await getAuthenticatedUser(
      this.getStrategy(context),
      request,
      response,
    );
    request.user = user;
    return true;
  }

  private getStrategy(context: ExecutionContext) {
    return (
      this.reflector.get<string>('strategy', context.getHandler()) ||
      this.reflector.get<string>('strategy', context.getClass()) ||
      'jwt'
    );
  }
}

const getAuthenticatedUser = (strategy, request, response): Promise<UserInfo> =>
  new Promise((resolve, reject) =>
    authenticate(strategy, {}, (err, user) =>
      err ? reject(err) : resolve(user),
    )(request, response, (err) => (err ? reject(err) : resolve)),
  );
