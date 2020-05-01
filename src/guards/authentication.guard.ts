import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { authenticate } from 'passport';

import { RequestWithUser } from './request-with-user.interface';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const [request, response] = [
      context.switchToHttp().getRequest(),
      context.switchToHttp().getResponse(),
    ];
    const strategy = this.getStrategy(context);
    const user = await getAuthenticatedUser(strategy, request, response);
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

const getAuthenticatedUser = (
  strategy,
  request,
  response,
): Promise<RequestWithUser> =>
  new Promise((resolve, reject) =>
    authenticate(strategy, {}, (err, user) =>
      err ? reject(err) : resolve(user),
    )(request, response, (err) => (err ? reject(err) : resolve)),
  );
