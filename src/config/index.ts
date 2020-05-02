import auth from './auth.config';

const general = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
});

export const configurations = [general, auth];
