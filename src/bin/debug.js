#!/usr/bin/env node

require('dotenv-safe').config({
  example: './.env.example',
})

const { inspect } = require('util')
const mongoose = require('mongoose')

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

const main = async () => {
  if (!(await connectToDB())) {
    process.exit(1)
  }

  const topic = await Topic.findOne({ slug: 'math' })
  const decks = await Deck.find({ topicId: topic._id })
  //console.log(inspect(decks, { depth: 4, color: true }))

  const subTopics = topic.subTopics.reduce(
    (result, subTopic) => ({
      ...result,
      [subTopic._id.toString()]: decks.filter(
        (deck) => deck.subTopicId.toString() === subTopic._id.toString()
      ),
    }),
    {}
  )
  console.log(inspect(subTopics, { depth: 4, color: true }))

  process.exit(0)
}

main()
