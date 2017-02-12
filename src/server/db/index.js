const mongoose = require('mongoose');

const { MONGODB_URI } = process.env;

mongoose.Promise = global.Promise;

exports.getDatabase = () => {
  if (!mongoose.connection.readyState) {
    mongoose.connect(MONGODB_URI);
  }
  return mongoose;
};
