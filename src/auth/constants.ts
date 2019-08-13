import { readFileSync } from 'fs';

export const jwtConstants = {
  privateKey: readFileSync('keys/private.key', 'utf8'),
  publicKey: readFileSync('keys/public.key', 'utf8'),
};
