const User = require('../../../models/User');
const { Strategy } = require('passport-local');

const config = {
  usernameField: 'email',
  passReqToCallback: true,
};

const signIn = (req, email, password, done) => {
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return done(null, false, { message: 'Invalid credential.' });
      }

      return user.validatePassword(password)
        .then((isMatch) => {
          if (!isMatch) {
            return done(null, false, { message: 'Invalid credential.' });
          }
          return done(null, {
            _id: user._id,
            name: user.name,
            email: user.email,
          });
        });
    })
    .catch(error => done(error));
};

module.exports = {
  signInStrategy: new Strategy(config, signIn),
};
