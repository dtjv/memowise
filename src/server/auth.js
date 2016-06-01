import passport from 'passport';
import { Strategy } from 'passport-local';
import User from './models/user';

export default () => {
  // Serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // Deserialize sessions
  passport.deserializeUser(function(id, done) {
    User.findOne({
      _id: id
    }, '-password', function(err, user) {
      done(err, user);
    });
  });

  passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  (email, password, done) => {
    User.findOne({
      email: email
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'unknown user'
        });
      }
      if (!user.authenticate(password)) {
        return done(null, false, {
          message: 'invalid password'
        });
      }

      return done(null, user);
    });
  }));
};