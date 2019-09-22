import { Injectable } from '@nestjs/common';
import { User } from './model';
import { Role } from '../auth/role';

const users: User[] = [
  {
    userId: 1,
    username: 'john',
    password: 'changeme',
    roles: [Role.Admin, Role.Developer],
  },
  {
    userId: 2,
    username: 'chris',
    password: 'secret',
    roles: [Role.Admin, Role.Developer],
  },
  {
    userId: 3,
    username: 'maria',
    password: 'guess',
    roles: [Role.Admin, Role.Developer],
  },
];

@Injectable()
export class UsersService {
  async findOne(username: string): Promise<User | undefined> {
    return users.find(user => user.username === username);
  }

  async register(username: string, password: string): Promise<User> {
    const maxUserId = users.reduce(
      (max, user) => Math.max(max, user.userId),
      0,
    );
    const userId = maxUserId + 1;
    users.push({ userId, username, password, roles: [] });
    return { userId, username, roles: [] };
  }
}
