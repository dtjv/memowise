import mongoose from 'mongoose'

const topicSchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  subTopics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubTopic',
    },
  ],
})

export const Topic =
  mongoose.models?.Topic ?? mongoose.model('Topic', topicSchema)
