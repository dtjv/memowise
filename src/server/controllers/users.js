import passport from 'passport';

const signIn = (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err || !user) {
      res.status(400).send(info);
    } else {
      // Remove sensitive data before login
      user.password = undefined;

      req.login(user, function(err) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(user);
        }
      });
    }
  })(req, res, next);
};

const verify = (req, res) => {
  if (req.user) {
    res.status(200).json({
      isLoggedIn: true
    });
  } else {
    res.status(403).json({
      isLoggedIn: false
    });
  }
}

export default { signIn, verify };
