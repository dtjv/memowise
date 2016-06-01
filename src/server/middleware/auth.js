import { Strategy } from 'passport-local';
import User from '../models/user';

const strategy = new Strategy({
  usernameField: 'email',
},
(email, password, done) => {
  console.log(email, password, done);
  User.findOne({ email }, (err, user) => {
    console.log(user);
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect email.' });
    }
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  });
});

export default strategy;
