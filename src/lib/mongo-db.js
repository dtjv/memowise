import { Deck } from '@/models/Deck'
import { User } from '@/models/User'
import { connectToDB } from '@/utils/connectToDB'
//import { transformObjectId } from '@/utils/transformObjectId'

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
export const getDeck = async (deckId) => {
  await connectToDB()
  return Deck.findById(deckId).populate('topic').populate('subTopic')
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

  return User.findById(userId)
    .populate('decks.linked')
    .populate('decks.created')
}

export const updateUser = async (userId, payload) => {}
