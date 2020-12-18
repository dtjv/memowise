import mongoose from 'mongoose'

const topicSchema = new mongoose.Schema({
  name: String,
  description: String,
  subTopics: [
    {
      name: String,
      description: String,
      numSets: Number,
    },
  ],
})

export const Topic =
  mongoose.models.Topic || mongoose.model('Topic', topicSchema)
