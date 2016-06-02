import mongoose from 'mongoose';
import cfg from '../config';

mongoose.connect(`mongodb://${cfg.db.host}:${cfg.db.port}/${cfg.db.dbName}`);

export default mongoose;
