const passport = require('passport');
const User = require('../../models/User');
const local = require('./strategies/local');

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

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

passport.use('signUp', local.signUpStrategy);
passport.use('signIn', local.signInStrategy);

module.exports = {
  isLoggedIn,
  local: {
    signUp: passport.authenticate('signUp'),
    signIn: passport.authenticate('signIn'),
  },
};
