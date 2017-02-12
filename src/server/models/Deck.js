const { getDatabase } = require('../db');

const db = getDatabase();

const DeckSchema = new db.Schema({
  name: String,
}, { timestamps: true });

module.exports = db.model('Deck', DeckSchema);
