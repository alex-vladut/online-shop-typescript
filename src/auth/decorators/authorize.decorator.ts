import { SetMetadata } from '@nestjs/common';

import { Role } from '../role';

export const Authorize = (...roles: Role[]) => SetMetadata('roles', roles);
