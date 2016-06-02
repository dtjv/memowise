import mongoose from '../db';

const CardsSchema = new mongoose.Schema({
  question: { text: String }, 
  answer: { text: String, explanation: String },
  deckId: String,
  created_at: String
});

export default mongoose.model('Cards', CardsSchema);
