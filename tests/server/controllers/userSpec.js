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

  describe('SignUp', () => {
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

  describe('SignIn', () => {
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
  });

  describe('fetchUser', () => {
    it('should return empty object when not signed in', (done) => {
      request(baseUrl)
        .get('/api/user')
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.deep.equal({});
          done();
        });
    });

    it('should verify athentication when signed in', (done) => {
      let session;

      // used to verify after setup
      const fetchUser = () => {
        const req = request(baseUrl).get('/api/user');

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
              // http://stackoverflow.com/questions/3467114/how-are-cookies-passed-in-the-http-protocol
              session = res.headers['set-cookie'].pop().split(';')[0];
              return fetchUser();
            });
        });
    });
  });
});
