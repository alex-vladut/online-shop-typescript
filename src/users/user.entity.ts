import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from '../auth/role';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password?: string;

  @Column({ type: 'json' })
  roles: Role[];
}
