import { Deck } from '@/models/Deck'
import { User } from '@/models/User'
import { Topic } from '@/models/Topic'
import { SubTopic } from '@/models/SubTopic'
import { connectToDB } from '@/utils/connectToDB'
import { transformObjectId } from '@/utils/transformObjectId'

//------------------------------------------------------------------------------
// MongoDB specific data layer.
//------------------------------------------------------------------------------

export const createDeck = async (newDeck) => {
  await connectToDB()
  return Deck.create(newDeck)
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

export const deleteDeck = async (deckId) => {
  await connectToDB()
  return Deck.deleteOne({ _id: deckId })
}

export const getUser = async (userId) => {
  await connectToDB()

  const user = await User.findById(userId)
    .populate('decks.linked')
    .populate('decks.created')

  return user.toObject({ transform: transformObjectId })
}

export const updateUser = async (userId, data) => {
  await connectToDB()

  const user = await User.findById(userId)
  user.decks = user.decks ?? { created: [], linked: [] }

  if (data?.created) {
    user.decks.created.push(data.created)
  }

  if (data?.linked) {
    user.decks.linked.push(data.linked)
  }

  if (data?.remove) {
    user.decks.created = user.decks.created.filter(
      (deck) => deck.id !== data.remove.deckId
    )
  }

  return user.save()
}

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
