import mongoose from 'mongoose'

const cardSetSchema = new mongoose.Schema({
  name: String,
  description: String,
  topic: mongoose.Schema.Types.ObjectId,
  subTopic: mongoose.Schema.Types.ObjectId,
  cards: [
    {
      term: String,
      definition: String,
    },
  ],
})

export const CardSet =
  mongoose.models.CardSet || mongoose.model('CardSet', cardSetSchema)
