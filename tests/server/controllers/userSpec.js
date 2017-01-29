/* global describe, xdescribe, it, xit, before, beforeEach, after, afterEach */

import { expect } from 'chai';
import request from 'supertest';
import mongoose from '../../../src/server/db';
import User from '../../../src/server/models/User';

require('dotenv-safe').load();

const { HOST, PORT, PROTOCOL } = process.env;
const baseUrl = `${PROTOCOL}://${HOST}:${PORT}`;

describe('User Controller', () => {
  const user = {
    name: 'Tester Name',
    email: 'name@tester.com',
    password: 'testing',
  };

  beforeEach((done) => {
    mongoose.connection.db.dropDatabase(err => err || done());
  });

  afterEach((done) => {
    mongoose.connection.db.dropDatabase(err => err || done());
  });

  describe('Account', () => {
    it('should return error trying to save duplicate username', (done) => {
      request(baseUrl)
        .post('/api/user/sign-up')
        .send(user)
        .expect(201)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.name).to.equal(user.name);
          expect(res.body.email).to.equal(user.email);
          expect(res.body.password).to.equal(undefined);
          return done();
        });
    });
  });

  describe('Authentication', () => {
    it('should fail to sign in with bad credentials', (done) => {
      User.create(user)
        .then(() => {
          request(baseUrl)
            .post('/api/user/sign-in')
            .send({ email: user.email, password: 'incorrect' })
            .expect(401)
            .end(err => (err ? done(err) : done()));
        });
    });

    it('should return the user profile on successful sign in', (done) => {
      User.create(user)
        .then(() => {
          request(baseUrl)
            .post('/api/user/sign-in')
            .send({ email: user.email, password: user.password })
            .expect(200)
            .end((err, res) => {
              if (err) {
                done(err);
              }
              expect(res.body.name).to.equal(user.name);
              expect(res.body.email).to.equal(user.email);
              done();
            });
        });
    });

    xit('should fail to verify athentication when not signed in', (done) => {
      request(baseUrl)
        .get('/api/auth/verify')
        .expect(401)
        .end(err => (err ? done(err) : done()));
    });

    xit('should verify athentication when signed in', (done) => {
      let session;

      // used to verify after setup
      const verify = () => {
        const req = request(baseUrl).get('/api/auth/verify');

        req.cookies = session;
        req.expect(200)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body.name).to.equal(user.name);
            expect(res.body.email).to.equal(user.email);
            return done();
          });
      };

      // setup user and sign them in
      User.create(user)
        .then(() => {
          request(baseUrl)
            .post('/api/user/sign-in')
            .send({ email: user.email, password: user.password })
            .expect(200)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              session = res.headers['set-cookie'].pop().split(';')[0];
              return verify();
            });
        });
    });
  });
});
