import passport from 'passport';
import User from '../models/user';

const createAccount = (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }).then(user => {
    res
      .status(200)
      .type('json')
      .json(user);
  });
};

const attemptSignIn = (req, res, user) => {
  req.login(user, err => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(user);
    }
  });
};

const signIn = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err || !user) {
      res.status(400).send(info);
    } else {
      attemptSignIn(req, res, user);
    }
  })(req, res, next);
};

const verify = (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(401).json({ message: 'not logged in' });
  }
};

const signOut = (req, res) => {
  req.logout();
  res.redirect('/');
};

export default { createAccount, signIn, verify, signOut };
