import process from 'process'
import mongoose from 'mongoose'

import { data } from '../data/seed'
import { User } from '../models/User'
import { Deck } from '../models/Deck'
import { dump } from '../utils/debug'
import { composeURI, connectToDB, isDBConnected } from '../utils/connectToDB.js'

export const resetUserDecks = async (id) => {
  if (!id) {
    return { error: `Error: invalid id: ${id}`, success: false }
  }

  await connectToDB(composeURI())

  if (!isDBConnected()) {
    return { error: `Error: Failed to connect to database`, success: false }
  }

  const user = await User.findById(id)
  const decks = await Deck.find({})

  if (!user) {
    return { error: `Error: No user found`, success: false }
  }

  if (!decks) {
    return { error: `Error: No decks found`, success: false }
  }

  if (decks.length < 6) {
    return { error: `Error: Number of decks < 6`, success: false }
  }

  user.decks = {
    linked: [],
    created: [],
    studied: [],
  }

  user.decks.linked.push(decks[0]._id)
  user.decks.linked.push(decks[1]._id)
  user.decks.linked.push(decks[2]._id)

  user.decks.created.push(decks[3]._id)
  user.decks.created.push(decks[4]._id)
  user.decks.created.push(decks[5]._id)

  await user.save()

  return { error: undefined, success: true }
}
