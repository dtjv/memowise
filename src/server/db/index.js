import mongoose from 'mongoose';
import cfg from '../config';

export default {
  connect: () => mongoose.connect(`mongodb://${cfg.db.host}:${cfg.db.port}/${cfg.db.dbName}`),
};
