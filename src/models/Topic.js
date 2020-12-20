import mongoose from 'mongoose'

const topicSchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  subTopics: [
    {
      name: String,
      description: String,
      numDecks: Number,
    },
  ],
})

export const Topic =
  mongoose.models.Topic || mongoose.model('Topic', topicSchema)
