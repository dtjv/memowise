const passport = require('passport');
const User = require('../../models/User');
const local = require('./strategies/local');

exports.registerAuthService = () => {
  passport.serializeUser((user, callback) => {
    callback(null, user._id);
  });

  passport.deserializeUser((id, callback) => {
    User.findById(id, '-password', (err, user) => {
      callback(err, user);
    });
  });

  passport.use('signIn', local.signInStrategy);
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  }
  // is this going to work?
  res.redirect('/api/user/sign-in');
};
