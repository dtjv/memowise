import mongoose from '../db';

const PlaySchema = new mongoose.Schema({
  rating: String,
  cardId: String,
  deckId: String,
  userId: String,
}, { timestamps: true },
);

export default mongoose.model('Play', PlaySchema);
