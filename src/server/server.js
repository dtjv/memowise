/* eslint-disable no-console */
require('dotenv-safe').load();

const cors = require('cors');
const { resolve } = require('path');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const { getDatabase } = require('./db');
const { registerAuthService } = require('./services/auth');

const { SESSION_SECRET, HOST, PORT } = process.env;
const baseUrl = `${HOST}:${PORT}`;

registerAuthService();

express()
  .use(cors({
    origin: '*',
    methods: ['GET, POST, OPTIONS'],
    allowHeaders: 'content-type, accept',
    credentials: true,
    maxAge: 10,
  }))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(cookieParser(SESSION_SECRET))
  .use(express.static(resolve(__dirname, '../../build')))
  .use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: getDatabase().connection }),
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use(require('./routes/deck'))
  .use(require('./routes/card'))
  .use(require('./routes/play'))
  .use(require('./routes/user'))
  .use(require('./routes/home'))
  .listen(PORT);

console.log(`Server listening on ${baseUrl}. Use <ctrl-c> to stop server.\n`);
