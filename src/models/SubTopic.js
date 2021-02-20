import mongoose from 'mongoose'

const subTopicSchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  numDecks: Number,
})

export const SubTopic =
  mongoose.models?.SubTopic ?? mongoose.model('SubTopic', subTopicSchema)
