/* eslint-disable no-console */

const { SESSION_SECRET, HOST, PORT, PROTOCOL } = require('../config');

const { resolve } = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('./db');
const MongoStore = require('connect-mongo')(session);

const baseUrl = `${PROTOCOL}://${HOST}:${PORT}`;

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
  .use(cookieParser())
  .use(express.static(resolve(__dirname, '../../build')))
  .use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use(require('./routes/deck'))
  .use(require('./routes/card'))
  .use(require('./routes/play'))
  .use(require('./routes/auth'))
  .use(require('./routes/home'))
  .listen(PORT);


console.log(`Server listening on ${baseUrl}. Use <ctrl-c> to stop server.\n`);
