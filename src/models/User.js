import mongoose from 'mongoose'

const userDecksSchema = new mongoose.Schema(
  {
    linked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deck',
      },
    ],
    created: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deck',
      },
    ],
  },
  { _id: false }
)

const userSchema = new mongoose.Schema({
  name: String,
  image: String,
  decks: {
    type: userDecksSchema,
    default: {},
  },
})

export const User = mongoose.models?.User ?? mongoose.model('User', userSchema)
