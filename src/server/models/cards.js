import mongoose from 'mongoose';

const CardsSchema = new mongoose.Schema({
  question: { text: String }, 
  answer: { text: String, explanation: String },
  deckId: String
});

export default mongoose.model('Cards', CardsSchema);
