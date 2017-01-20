const mongoose = require('mongoose');
const cfg = require('../config');

if (!mongoose.connection.readyState) {
  mongoose.connect(`mongodb://${cfg.db.host}:${cfg.db.port}/${cfg.db.dbName}`);
}

module.exports = mongoose;
