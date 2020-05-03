import { Role } from './role';

export interface UserInfo {
  id?: number;
  username: string;
  password?: string;
  roles: Role[];
}
