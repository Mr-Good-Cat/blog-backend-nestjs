import dbConfig from './db.config';

export default () => {
  return {
    port: parseInt(process.env.PORT) || 3000,
    mode: process.env.MODE || 'PROD',

    database: dbConfig(),

    jwtSecret: process.env.JWT_SECRET_KEY || 'secretKey',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  };
};
