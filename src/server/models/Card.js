const { getDatabase } = require('../db');

const db = getDatabase();

const CardSchema = new db.Schema({
  deckId: String,
  question: {
    text: String,
  },
  answer: {
    text: String,
    explanation: String,
  },
}, { timestamps: true });

module.exports = db.model('Card', CardSchema);
