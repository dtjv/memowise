import mongoose from 'mongoose'

const topicSchema = new mongoose.Schema(
  {
    name: String,
    slug: String,
    description: String,
    subTopics: [
      {
        name: String,
        slug: String,
        description: String,
        numDecks: Number,
      },
    ],
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id
        delete ret._id
      },
    },
  }
)

export const Topic =
  mongoose.models.Topic || mongoose.model('Topic', topicSchema)
