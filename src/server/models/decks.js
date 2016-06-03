import mongoose from '../db';

const DecksSchema = new mongoose.Schema({
  name: String,
}, { timstamps: true }
);

export default mongoose.model('Decks', DecksSchema);
