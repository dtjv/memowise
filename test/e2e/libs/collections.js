const { getDatabase } = require('server/db');
const User = require('server/models/User');

exports.emptyUsersCollection = (done) => {
  const cb = done || (() => {});

  const db = getDatabase();

  return User.remove({}, (err) => {
    if (err) {
      return cb(err);
    }
    return db.disconnect().then(() => cb());
  });
};
