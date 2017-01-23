require('dotenv').config({ silent: true });

const { resolve } = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('./db');
const setupPassport = require('./setupPassport');
const MongoStore = require('connect-mongo')(session);

// routes
const homeRoute = require('./routes/home');
const authRoute = require('./routes/auth');
const deckRoute = require('./routes/deck');
const cardRoute = require('./routes/card');
const playRoute = require('./routes/play');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

setupPassport();

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
  .use(express.static(resolve(__dirname, '../../dev'))) // TODO: don't hardcode dev
  .use(session({
    secret: 'wonky',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use(deckRoute)
  .use(cardRoute)
  .use(playRoute)
  .use(authRoute)
  .use(homeRoute)
  .listen(port);

process
  .stdout
  .write(`Server listening on http://${host}:${port}. Use <ctrl-c> to stop server.\n`);
