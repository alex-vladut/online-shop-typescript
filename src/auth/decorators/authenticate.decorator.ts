import { SetMetadata } from '@nestjs/common';

export const Authenticate = (strategy: 'jwt' | 'local' = 'jwt') =>
  SetMetadata('strategy', strategy);
