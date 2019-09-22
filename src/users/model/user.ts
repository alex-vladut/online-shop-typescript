import { Role } from '../../auth/role';

export interface User {
  userId?: number;
  username: string;
  password?: string;
  roles: Role[];
}
