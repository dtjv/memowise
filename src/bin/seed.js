#!/usr/bin/env node

const mongoose = require('mongoose')
const { v4: uuid } = require('uuid')

const { data } = require('../data/seed')

// -----------------------------------------------------------------------------
//
//
// READ!!!!!
//
// Don't forget to make any necessary changes to the schema in `base`. This does
// not use the schema in `models/`.
//
//
// -----------------------------------------------------------------------------
const { Topic, SubTopic, Deck, connectToDB } = require('./base')

// -----------------------------------------------------------------------------
// main
// -----------------------------------------------------------------------------

const main = async ({ data }) => {
  if (!(await connectToDB())) {
    console.error(`no db connection`)
    process.exit(1)
  }

  try {
    //    await mongoose.connection.db.dropCollection('topics')
    await mongoose.connection.db.dropCollection('decks')
  } catch (error) {
    console.error(`failed to drop collections.`, error)
    process.exit(1)
  }

  // SubTopic
  /*
  const subTopicData = data.topics.flatMap((topic) => topic.subTopics)
  await SubTopic.create(subTopicData)
  */
  const subTopicList = await SubTopic.find({})

  // Topic
  /*
  const topicData = data.topics.map((topic) => {
    topic.subTopics = topic.subTopics.map((subTopic) => {
      const doc = subTopicList.find((doc) => doc.name === subTopic.name)
      return doc._id
    })
    return topic
  })
  await Topic.create(topicData)
  */
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

  process.exit(0)
}

main({ data })
