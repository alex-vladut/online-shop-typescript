import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, PrimaryColumn } from 'typeorm';

import { Role } from '../auth/role';

@Entity()
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password?: string;

  @Column({ type: 'json' })
  roles: Role[];

  static create(username: string, password: string) {
    const user = new this();
    user.id = uuidv4();
    user.username = username;
    user.password = password;
    user.roles = [Role.Admin, Role.Developer];
    return user;
  }
}
