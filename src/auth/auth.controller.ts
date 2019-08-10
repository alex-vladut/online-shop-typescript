import { Controller, Get, Post, Request, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/register')
  // TODO add input validation
  async register(@Body() { username, password }: any) {
    return this.authService.register(username, password);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard())
  @Get('/me')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
