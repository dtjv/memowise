/* global describe, it, before, beforeEach, after, afterEach */
import chai from 'chai';
import request from 'supertest';
import mongoose from '../../src/server/db';

// should be replaced by just loading fixtures before each test
import User from '../../src/server/models/User';

const expect = chai.expect;

describe('Routing', () => {
  const url = 'http://localhost:3000';
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
      request(url)
        .post('/api/auth/create-account')
        .send(user)
        .expect(201)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res.body.name).to.equal(user.name);
          expect(res.body.email).to.equal(user.email);
          expect(res.body.password).to.equal(undefined);
          done();
        });
    });
  });

  describe('Authentication', () => {
    it('should fail to sign in with bad credentials', (done) => {
      User.create(user)
      .then(() => {
        request(url)
          .post('/api/auth/sign-in')
          .send({ email: user.email, password: 'incorrect' })
          .expect(401)
          .end((err) => {
            if (err) {
              throw err;
            }
            done();
          });
      });
    });

    it('should return the user profile on successful sign in', (done) => {
      User.create(user)
      .then(() => {
        request(url)
          .post('/api/auth/sign-in')
          .send({ email: user.email, password: user.password })
          .expect(200)
          .end((err, res) => {
            if (err) {
              throw err;
            }
            expect(res.body.name).to.equal(user.name);
            expect(res.body.email).to.equal(user.email);
            done();
          });
      });
    });

    it('should fail to verify athentication when not signed in', (done) => {
      request(url)
        .get('/api/auth/verify')
        .expect(401)
        .end((err) => {
          if (err) {
            throw err;
          }
          done();
        });
    });

    it('should verify athentication when signed in', (done) => {
      let session;

      // used to verify after setup
      const verify = () => {
        const req = request(url).get('/api/auth/verify');

        req.cookies = session;
        req.expect(200)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res.body.name).to.equal(user.name);
          expect(res.body.email).to.equal(user.email);
          done();
        });
      };

      // setup user and sign them in
      User.create(user)
      .then(() => {
        request(url)
          .post('/api/auth/sign-in')
          .send({ email: user.email, password: user.password })
          .expect(200)
          .end((err, res) => {
            if (err) {
              throw err;
            }
            session = res.headers['set-cookie'].pop().split(';')[0];
            verify();
          });
      });
    });
  });
});
