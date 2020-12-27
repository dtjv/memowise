import { Topic } from '@/models/Topic'
import { Deck } from '@/models/Deck'
import { connectToDB } from '@/utils/connectToDB'
import { transformObjectId } from '@/utils/transformObjectId'

export default async function handler(req, res) {
  const {
    query: { deckid },
  } = req

  connectToDB()

  try {
    let deck = await Deck.findById(deckid)
    deck = deck.toObject({ transform: transformObjectId })
    deck.topicId = deck.topicId.toString()
    deck.subTopicId = deck.subTopicId.toString()

    let topic = await Topic.findById(deck.topicId)
    topic = topic.toObject({ transform: transformObjectId })

    const subTopic = topic.subTopics.find(
      (subTopic) => subTopic.id === deck.subTopicId.toString()
    )

    res.status(200).json({
      deck,
      topic: { name: topic.name, slug: topic.slug },
      subTopic: { name: subTopic.name, slug: subTopic.slug },
    })
  } catch (error) {
    console.error(error)
    res.status(400).json(error)
  }
}
