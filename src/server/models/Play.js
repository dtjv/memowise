const { getDatabase } = require('../db');

const db = getDatabase();

const PlaySchema = new db.Schema({
  rating: String,
  cardId: String,
  deckId: String,
  userId: String,
}, { timestamps: true });

module.exports = db.model('Play', PlaySchema);
