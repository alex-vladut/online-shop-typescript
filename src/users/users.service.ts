import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { Role } from '../auth/role';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async register(username: string, password: string): Promise<User> {
    const user = new User();
    user.username = username;
    user.password = password;
    user.roles = [Role.Admin, Role.Developer];
    return this.usersRepository.save(user);
  }
}
