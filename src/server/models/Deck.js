import mongoose from '../db';

const DeckSchema = new mongoose.Schema({
  name: String,
}, { timestamps: true });

export default mongoose.model('Deck', DeckSchema);
