const mongoose = require('../db');

const DeckSchema = new mongoose.Schema({
  name: String,
}, { timestamps: true });

module.exports = mongoose.model('Deck', DeckSchema);
