import mongoose from 'mongoose';
import cfg from '../config';

// attempt to connect if not connected
if (mongoose.connection.readyState === 0) {
  mongoose.connect(`mongodb://${cfg.db.host}:${cfg.db.port}/${cfg.db.dbName}`);
}

export default mongoose;
