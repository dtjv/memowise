require('dotenv').config({ silent: true });

module.exports = {
  SESSION_SECRET: process.env.SESSION_SECRET || 'memowise',

  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || '3000',
  PROTOCOL: process.env.PROTOCOL || 'http',

  DB_NAME: process.env.DB_NAME || 'wonky',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 27017,
};
