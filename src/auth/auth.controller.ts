import { Body, Controller, Get, Post, Request } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Authenticate, Public, Authorize } from './decorators';
import { Role } from './role';
import { RequestWithUserInfo } from '../guards/request-with-user-info.interface';

@Controller('/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Public()
  @Post('/register')
  async register(@Body() { username, password }: any) {
    return this.service.register(username, password);
  }

  @Public()
  @Authenticate('local')
  @Post('/login')
  async login(@Request() req: RequestWithUserInfo) {
    return this.service.login(req.user);
  }

  @Authorize(Role.Admin)
  @Get('/me')
  getProfile(@Request() req: RequestWithUserInfo) {
    return req.user;
  }
}
