import { readFileSync } from 'fs';

export default () => ({
  privateKey:
    process.env.PRIVATE_KEY || readFileSync('keys/private.key', 'utf8'),
  publicKey: process.env.PUBLIC_KEY || readFileSync('keys/public.key', 'utf8'),
});
