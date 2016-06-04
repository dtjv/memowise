import mongoose from '../db';

const PlaysSchema = new mongoose.Schema({
  rating: String,
  cardId: String,
  deckId: String,
  userId: String,
}, { timestamps: true }
);

export default mongoose.model('Plays', PlaysSchema);
