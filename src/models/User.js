import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: String,
  image: String,
  decks: {
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
})

export const User = mongoose.models.User || mongoose.model('User', userSchema)
