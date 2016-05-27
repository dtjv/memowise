import mongoose from 'mongoose';

const DecksSchema = new mongoose.Schema({
  name: String,
  cards: [
    { question: { text: String }, answer: { text: String, explanation: String } },
  ],
});

export default mongoose.model('Decks', DecksSchema);
