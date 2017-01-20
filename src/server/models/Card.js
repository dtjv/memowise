const mongoose = require('../db');

const CardSchema = new mongoose.Schema({
  question: { text: String },
  answer: { text: String, explanation: String },
  deckId: String,
  userId: String,
}, { timestamps: true });

module.exports = mongoose.model('Card', CardSchema);
