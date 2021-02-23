import * as mongo from './mongo-db'

//------------------------------------------------------------------------------
// The generic data layer interface.
//------------------------------------------------------------------------------

export const createDeck = async (userId, newDeck) => {
  return mongo.createDeck(userId, newDeck)
}

export const getDeck = async (filter = {}) => {
  return mongo.getDeck(filter)
}

export const getDeckList = async (filter = {}) => {
  return mongo.getDeckList(filter)
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

export const getTopic = async (filter = {}) => {
  return mongo.getTopic(filter)
}

export const getTopicList = async (filter = {}) => {
  return mongo.getTopicList(filter)
}

export const getSubTopic = async (filter = {}) => {
  return mongo.getSubTopic(filter)
}
