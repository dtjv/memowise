const mongoose = require('mongoose');

const { MONGODB_URI } = process.env;

mongoose.Promise = global.Promise;

if (!mongoose.connection.readyState) {
  mongoose.connect(MONGODB_URI);
}

module.exports = mongoose;
