import { resolve } from 'path';
import express from 'express';
import parser from 'body-parser';
import cors from 'cors';
import homeRoute from './routes/home';
import apiRoute from './routes/api';
import db from './db';

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

db.connect();

express()
  .use(cors({
    origin: '*',
    methods: ['GET, POST, PUT, DELETE, OPTIONS'],
    allowHeaders: 'content-type, accept',
    maxAge: 10,
  }))
  .use(parser.urlencoded({ extended: true }))
  .use(parser.json())
  .use(express.static(resolve(__dirname, '../')))
  .use(apiRoute)
  .use(homeRoute)
  .listen(port);

process
  .stdout
  .write(`Server listening on http://${host}:${port}. Use <ctrl-c> to stop server.\n`);
