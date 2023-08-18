import dbConfig from './db.config';

export default () => {
  return {
    port: parseInt(process.env.PORT) || 3000,
    mode: process.env.MODE || 'PROD',

    database: dbConfig(),
  };
};
