const passport = require('passport');
const User = require('../models/User');

exports.signUp = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((existingUser) => {
      if (existingUser) {
        res.status(400).json({ message: 'Email already exists.' });
      }

      return User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
      .then((user) => {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
    });
};

exports.signIn = (req, res) => {
  passport.authenticate('signIn', (error, user, info) => {
    if (error) {
      res.status(500).send(error);
    } else if (!user) {
      res.status(401).send(info);
    } else {
      req.logIn(user, (err) => {
        if (err) {
          res.status(401).send(err);
        } else {
          res.status(200).json(user);
        }
      });
    }
  })(req, res);
};

exports.signOut = (req, res) => {
  req.logout();
  res.status(200).end();
};

// may not need
exports.fetchUser = (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(404).send(undefined);
  }
};
