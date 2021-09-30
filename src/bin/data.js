import process from 'process'
import mongoose from 'mongoose'
import { v4 as uuid } from 'uuid'

import { data } from '../data/seed'
import { Deck } from '../models/Deck'
import { Topic } from '../models/Topic'
import { SubTopic } from '../models/SubTopic'
import { composeURI, connectToDB, isDBConnected } from '../utils/connectToDB.js'

export const loadData = async () => {
  await connectToDB(composeURI())

  if (!isDBConnected()) {
    return { error: `Error: Failed to connect to database`, success: false }
  }

  try {
    await mongoose.connection.db.dropCollection('topics')
    await mongoose.connection.db.dropCollection('subtopics')
    await mongoose.connection.db.dropCollection('decks')
  } catch (error) {
    // MongoDB code for 'NamespaceNotFound'
    if (error?.code !== 26) {
      return { error, success: false }
    }
  }

  try {
    // SubTopics
    const subTopicData = data.topics.flatMap((topic) => topic.subTopics)
    await SubTopic.create(subTopicData)
    const subTopicList = await SubTopic.find({})

    // Topics
    const topicData = data.topics.map((topic) => {
      topic.subTopics = topic.subTopics.map((subTopic) => {
        const doc = subTopicList.find((doc) => doc.name === subTopic.name)
        return doc._id
      })
      return topic
    })
    await Topic.create(topicData)
    const topicList = await Topic.find({})

    // Deck
    const deckData = data.decks.map((deck) => {
      const topicDoc = topicList.find((doc) => doc.name === deck.meta.topic)
      const subTopicDoc = subTopicList.find(
        (doc) => doc.name === deck.meta.subTopic
      )
      return {
        name: deck.name,
        description: deck.description,
        cards: deck.cards.map((card) => ({ ...card, __uid: uuid() })),
        topic: topicDoc._id,
        subTopic: subTopicDoc._id,
      }
    })
    await Deck.create(deckData)
  } catch (error) {
    return { error, success: true }
  }

  return { error: undefined, success: true }
}
