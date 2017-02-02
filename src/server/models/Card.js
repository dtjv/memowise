const mongoose = require('../db');

const CardSchema = new mongoose.Schema({
  deckId: String,
  question: {
    text: String,
  },
  answer: {
    text: String,
    explanation: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Card', CardSchema);
