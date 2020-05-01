import { Body, Controller, Get, Post, Request } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Authenticate, Public, Authorize } from './decorators';
import { Role } from './role';
import { RequestWithUser } from '../guards/request-with-user.interface';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/register')
  async register(@Body() { username, password }: any) {
    return this.authService.register(username, password);
  }

  @Public()
  @Authenticate('local')
  @Post('/login')
  async login(@Request() req: RequestWithUser) {
    return this.authService.login(req.user);
  }

  @Authorize(Role.Admin)
  @Get('/me')
  getProfile(@Request() req: RequestWithUser) {
    return req.user;
  }
}
