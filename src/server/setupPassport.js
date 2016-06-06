import passport from 'passport';
import { Strategy } from 'passport-local';
import User from './models/User';

const oid = '_id';

export default () => {
  // Serialize sessions
  passport.serializeUser((user, done) => done(null, user[oid]));

  // Deserialize sessions
  passport.deserializeUser((id, done) => {
    User.findOne({
      _id: id,
    }, '-password', (err, user) => {
      done(err, user);
    });
  });

  passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password',
  },
    (email, password, done) => {
      User.findOne({
        email,
      },
      (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: 'unknown user',
          });
        }
        return user.authenticate(password, (error, isMatch) => {
          if (!isMatch) {
            return done(null, false, {
              message: 'invalid password',
            });
          }
          return done(null, { _id: user[oid], name: user.name, email: user.email });
        });
      });
    }));
};
