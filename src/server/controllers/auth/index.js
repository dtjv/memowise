const passport = require('passport');
const User = require('../../models/User');
const local = require('./strategies/local');

passport.serializeUser((user, callback) =>
  callback(null, user.id));

passport.deserializeUser((id, callback) => {
  User.findById(id, '-password', (err, user) => {
    callback(err, user);
  });
});

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  }
  res.redirect('/api/user/sign-in');
};

passport.use('signIn', local.signInStrategy);
passport.use('signUp', local.signUpStrategy);

module.exports = {
  isLoggedIn,
  local: {
    // what's going to happen on success and failure? no redirects
    signIn: passport.authenticate('signIn'),
    signUp: passport.authenticate('signUp'),
  },
};
