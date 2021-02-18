import mongoose from 'mongoose'

const deckSchema = new mongoose.Schema({
  name: String,
  description: String,
  creator: mongoose.Schema.Types.ObjectId,
  topicId: mongoose.Schema.Types.ObjectId,
  subTopicId: mongoose.Schema.Types.ObjectId,
  cards: [
    {
      term: String,
      definition: String,
    },
  ],
})

export const Deck = mongoose.models.Deck || mongoose.model('Deck', deckSchema)
