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
    studied: [
      {
        deckId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Deck',
        },
        cards: [
          {
            cardId: mongoose.Schema.Types.ObjectId,
            rep: {
              type: Number,
              default: 0,
            },
            repInterval: {
              type: Number,
              default: 1,
            },
            easyFactor: {
              type: mongoose.Schema.Types.Decimal128,
              default: 2.5,
            },
            lastStudyDate: {
              type: Date,
              default: Date.now,
            },
            lastStudyGrade: {
              type: Number,
              default: 0,
            },
          },
        ],
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
