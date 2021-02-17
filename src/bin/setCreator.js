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

const dump = (o, msg) => {
  console.info(inspect(o, { depth: 6, color: true }), msg)
}

// -----------------------------------------------------------------------------
// Models
// TODO: remove and import from 'models/' - once I port to Typescript
// -----------------------------------------------------------------------------
const userSchema = new mongoose.Schema({
  name: String,
  image: String,
})

const User = mongoose.model('User', userSchema)

const deckSchema = new mongoose.Schema({
  name: String,
  description: String,
  creator: mongoose.Schema.Types.ObjectId,
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

  const user = await User.findOne({ name: 'David Valles' })
  const decks = await Deck.find({})

  if (user?._id) {
    for (let i = 0; i < decks.length; i += 1) {
      const deck = decks[i]
      deck.creator = user._id
      const doc = await deck.save()
      dump(doc?.creator, '<-- creator')
    }
  }

  process.exit(0)
}

// -----------------------------------------------------------------------------
// start up
// -----------------------------------------------------------------------------
main()
