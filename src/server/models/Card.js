import mongoose from '../db';

const CardSchema = new mongoose.Schema({
  question: { text: String },
  answer: { text: String, explanation: String },
  deckId: String,
  userId: String,
}, { timestamps: true });

export default mongoose.model('Card', CardSchema);
