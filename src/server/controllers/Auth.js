const passport = require('passport');
const User = require('../models/User');

exports.createAccount = (req, res) => {
  User.findOne({ email: req.body.email }).then((exists) => {
    if (exists) {
      return res
        .status(400)
        .type('json')
        .json({ message: 'User with same email already exists' });
    }

    return User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }).then((user) => {
      const created = user.toObject();
      delete created.password;
      res.status(201).json(created);
    })
    .catch((error) => {
      res
        .status(500)
        .type('json')
        .json({ error });
    });
  });
};

exports.attemptSignIn = (req, res, user) => {
  req.login(user, (err) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.json(user);
    }
  });
};

exports.signIn = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err || !user) {
      res.status(401).send(info);
    } else {
      exports.attemptSignIn(req, res, user);
    }
  })(req, res, next);
};

exports.verify = (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(401).json({ message: 'not logged in' });
  }
};

exports.checkAuthorized = (req, res) => {
  if (req.user) {
    res.status(200).json({ loggedIn: true });
  } else {
    res.status(401).json({ loggedIn: false });
  }
};

exports.checkAuthServer = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ message: 'not logged in' });
  }
};

exports.signOut = (req, res) => {
  req.logout();
  res.redirect('/');
};
