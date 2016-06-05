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
    })
    .then(function(user) {
      if (user) {
        user.authenticate(password, function(err, isMatch) {
          if ( err || !isMatch) {
            return done(null, false, {
              message: 'invalid password',
            })
          } else {
            return done(null, { _id: user[oid], name: user.name, email: user.email });
          }
        });
    } else {
      return done(null, false, { message: 'unknown user' });
    }
  }).catch(function(err) {
      return done(err);
  }); 
  })
  );
};

