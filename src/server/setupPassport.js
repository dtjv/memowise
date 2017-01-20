const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('./models/User');

const oid = '_id';

module.exports = () => {
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
            message: 'User not found',
          });
        }
        return user.authenticate(password, (error, isMatch) => {
          if (!isMatch) {
            return done(null, false, {
              message: 'Incorrect password',
            });
          }
          return done(null, { _id: user[oid], name: user.name, email: user.email });
        });
      });
    }));
};
