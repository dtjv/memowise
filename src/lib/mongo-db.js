import { Topic } from '@/models/Topic'
import { SubTopic } from '@/models/SubTopic'
import { Deck } from '@/models/Deck'
import { User } from '@/models/User'
import { connectToDB } from '@/utils/connectToDB'
import { transformObjectId } from '@/utils/transformObjectId'

//import { dump } from '@/utils/debug'

//------------------------------------------------------------------------------
// MongoDB specific data layer.
//------------------------------------------------------------------------------

// TODO
// - sometimes i need topic and/or subTopic and sometimes i don't
//   .populate('topic').populate('subTopic')
// - sometimes i need to serialize...
//   deck = deck.toObject({ transform: transformObjectId })
//   delete deck.topic?.subTopics
//
// all these are special cases for the consumer of this function. perhaps i
// add an options arg???

export const createDeck = async () => {}

export const getDeck = async (filter = {}) => {
  await connectToDB()

  const deck =
    'id' in filter
      ? await Deck.findById(filter.id).populate('topic').populate('subTopic')
      : await Deck.findOne(filter).populate('topic').populate('subTopic')

  return deck.toObject({ transform: transformObjectId })
}

export const getDeckList = async (filter = {}) => {
  await connectToDB()
  const decks = await Deck.find(filter).populate('topic').populate('subTopic')
  return decks.map((deck) => deck.toObject({ transform: transformObjectId }))
}

export const updateDeck = async (deckId, payload) => {}

export const deleteDeck = async (deckId) => {}

// TODO
// notice i'm returning directly from a call to User. i'm not awaiting, and i
// didn't assign to a local variable. this is an async func, so it returns a
// promise. the consumer of this function would write:
//    const user = await getUser(userId)
// let's see if it works!
export const getUser = async (userId) => {
  await connectToDB()
  const user = await User.findById(userId)
    .populate('decks.linked')
    .populate('decks.created')
  return user.toObject({ transform: transformObjectId })
}

export const updateUser = async (userId, payload) => {}

export const getTopic = async (filter = {}) => {
  await connectToDB()

  const topic =
    'id' in filter
      ? await Topic.findById(filter.id).populate('subTopics')
      : await Topic.findOne(filter).populate('subTopics')

  return topic.toObject({ transform: transformObjectId })
}

export const getTopicList = async (filter = {}) => {
  await connectToDB()

  const topics = await Topic.find(filter).populate('subTopics')

  return topics.map((topic) => {
    topic = topic.toObject({ transform: transformObjectId })
    return {
      ...topic,
      numDecks: topic.subTopics.reduce(
        (count, { numDecks }) => count + numDecks,
        0
      ),
    }
  })
}

export const getSubTopic = async (filter = {}) => {
  await connectToDB()

  const subTopic =
    'id' in filter
      ? await SubTopic.findById(filter.id)
      : await SubTopic.findOne(filter)

  return subTopic.toObject({ transform: transformObjectId })
}
