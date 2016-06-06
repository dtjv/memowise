import passport from 'passport';
import User from '../models/User';

const createAccount = (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }).then(user => {
    const created = user.toObject();
    delete created.password;
    res.status(201).json(created);
  })
  .catch(error => {
    res
      .status(500)
      .type('json')
      .json({ error });
  });
};

const attemptSignIn = (req, res, user) => {
  req.login(user, err => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.json(user);
    }
  });
};

const signIn = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err || !user) {
      res.status(401).send(info);
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

const checkAuthorized = (req, res) => {
  if (req.user) {
    res.status(200).json({ loggedIn: true });
  } else {
    res.status(401).json({ loggedIn: false });
  }
};

const signOut = (req, res) => {
  req.logout();
  res.redirect('/');
};

export default { createAccount, signIn, verify, checkAuthorized, signOut };
