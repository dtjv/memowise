import mongoose from '../db';

const DecksSchema = new mongoose.Schema({
  name: String,
  created_at: String
});

export default mongoose.model('Decks', DecksSchema);
