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
      .populate('topic')
      .populate('subTopic')
    deck = deck.toObject({ transform: transformObjectId })
    delete deck.topic?.subTopics

    res.status(200).json({ deck })
  } catch (error) {
    console.error(error)
    res.status(400).json(error)
  }
}
