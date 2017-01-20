const mongoose = require('../db');

const PlaySchema = new mongoose.Schema({
  rating: String,
  cardId: String,
  deckId: String,
  userId: String,
}, { timestamps: true });

module.exports = mongoose.model('Play', PlaySchema);
