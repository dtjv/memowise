import mongoose from '../db';

const DecksSchema = new mongoose.Schema({
  name: String,
}, { timestamps: true }
);

export default mongoose.model('Decks', DecksSchema);
