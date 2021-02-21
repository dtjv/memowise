import * as mongo from './mongo-db'

//------------------------------------------------------------------------------
// The generic data layer interface.
//------------------------------------------------------------------------------

// TODO: do calls to mongo need to be awaited?
export const createDeck = async () => {
  return mongo.createDeck()
}

export const getDeck = async (deckId) => {
  return mongo.getDeck(deckId)
}

export const getDeckList = async () => {
  return mongo.getDeckList()
}

export const updateDeck = async (deckId, payload) => {
  return mongo.updateDeck(deckId, payload)
}
export const deleteDeck = async (deckId) => {
  return mongo.deleteDeck(deckId)
}

export const getUser = async (userId) => {
  return mongo.getUser(userId)
}

export const updateUser = async (userId, payload) => {
  return mongo.updateUser(userId, payload)
}
