import mongoose from 'mongoose'

const deckSchema = new mongoose.Schema({
  name: String,
  description: String,
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
  },
  subTopic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubTopic',
  },
  cards: [
    {
      __uid: String,
      term: String,
      definition: String,
    },
  ],
})

export const Deck = mongoose.models?.Deck ?? mongoose.model('Deck', deckSchema)
