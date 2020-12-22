#!/usr/bin/env node

require('dotenv-safe').config({
  example: './.env.example',
})

const mongoose = require('mongoose')
const { data } = require('../data/seed')

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const composeDbURI = () =>
  process.env.DB_URI.replace(/\$DB_USER/, process.env.DB_USER)
    .replace(/\$DB_PASS/, process.env.DB_PASS)
    .replace(/\$DB_NAME/, process.env.DB_NAME)

// -----------------------------------------------------------------------------
// Models
// TODO: remove and import from 'models/' - once I port to Typescript
// -----------------------------------------------------------------------------

const topicSchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  subTopics: [
    {
      name: String,
      slug: String,
      description: String,
      numDecks: Number,
    },
  ],
})

const Topic = mongoose.model('Topic', topicSchema)

const deckSchema = new mongoose.Schema({
  name: String,
  description: String,
  topicId: mongoose.Schema.Types.ObjectId,
  subTopicId: mongoose.Schema.Types.ObjectId,
  cards: [
    {
      term: String,
      definition: String,
    },
  ],
})

const Deck = mongoose.model('Deck', deckSchema)

// -----------------------------------------------------------------------------
// DB
// TODO: remove and import from 'utils/' - once I port to Typescript
// -----------------------------------------------------------------------------

const connectToDB = async () => {
  const uri = composeDbURI()

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

// -----------------------------------------------------------------------------
// main
// -----------------------------------------------------------------------------

const main = async ({ data }) => {
  if (!(await connectToDB())) {
    process.exit(1)
  }

  try {
    await mongoose.connection.db.dropCollection('topics')
    await mongoose.connection.db.dropCollection('decks')
  } catch (error) {}

  await Topic.create(data.topics)
  const topics = await Topic.find({})

  const decks = data.decks.map((deck) => {
    const topicDoc = topics.find((topic) => topic.name === deck.meta.topic)
    const subTopicDoc = topicDoc.subTopics.find(
      (subTopic) => subTopic.name === deck.meta.subTopic
    )

    return {
      name: deck.name,
      description: deck.description,
      cards: deck.cards,
      topicId: topicDoc._id,
      subTopicId: subTopicDoc._id,
    }
  })

  await Deck.create(decks)

  process.exit(0)
}

main({ data })
