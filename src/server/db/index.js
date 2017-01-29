const mongoose = require('mongoose');

const { DB_NAME, DB_HOST, DB_PORT } = process.env;

mongoose.Promise = global.Promise;

if (!mongoose.connection.readyState) {
  mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);
}

module.exports = mongoose;
