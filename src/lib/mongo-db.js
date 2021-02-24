import { Deck } from '@/models/Deck'
import { User } from '@/models/User'
import { Topic } from '@/models/Topic'
import { SubTopic } from '@/models/SubTopic'
import { connectToDB } from '@/utils/connectToDB'
import { transformObjectId } from '@/utils/transformObjectId'

//import { dump } from '@/utils/debug'

//------------------------------------------------------------------------------
// MongoDB specific data layer.
//------------------------------------------------------------------------------

export const createDeck = async (userId, newDeck) => {
  await connectToDB()

  const savedDeck = await Deck.create(newDeck)
  const user = await User.findById(userId)

  // TODO: move this to undateUser.
  user.decks = user.decks ?? { created: [], linked: [] }
  user.decks.created.push(savedDeck._id)
  await user.save()

  return savedDeck
}

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

export const updateDeck = async (deckId, updatedDeck) => {
  await connectToDB()

  const deck = await Deck.findById(deckId)

  deck.set(updatedDeck)

  return deck.save()
}

export const deleteDeck = async (deckId) => {}

export const getUser = async (userId) => {
  await connectToDB()

  const user = await User.findById(userId)
    .populate('decks.linked')
    .populate('decks.created')

  return user.toObject({ transform: transformObjectId })
}

// how this method is called:
//    updateUser(userId, { created: savedDeck._id })
//    updateUser(userId, { link: deck._id })
//    updateUser(userId, { remove: deck._id })
// no no no... the application should handle construciton of an updated deck.
// this function should be as dump as possible....
// you don't want application logic in your data layer!!!
export const updateUser = async (userId, options) => {}

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
