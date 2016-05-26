import { join, resolve } from 'path';
import express from 'express';
import parser from 'body-parser';
import cors from 'cors';
import homeRoute from './routes/home';
import errorRoute from './routes/error';

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

express()
  .set('view engine', 'jade')
  .set('views', './dev/server/views')
  .use(cors({
    origin: '*',
    methods: ['GET, POST, PUT, DELETE, OPTIONS'],
    allowHeaders: 'content-type, accept',
    maxAge: 10,
  }))
  .use(parser.urlencoded({ extended: true }))
  .use(parser.json())
  .use(express.static(join(resolve(__dirname, '../'))))
  .use(homeRoute)
  .use(errorRoute)
  .listen(port);

process
  .stdout
  .write(`Server listening on http://${host}:${port}. Use <ctrl-c> to stop server.\n`);
