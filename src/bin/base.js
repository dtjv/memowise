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

exports.dump = (o, msg) => {
  console.info(inspect(o, { depth: 6, color: true }), msg)
}

exports.transformObjectId = (_, ret) => {
  ret.id = ret._id.toString()
  delete ret._id
  return ret
}

// -----------------------------------------------------------------------------
// Models
// -----------------------------------------------------------------------------
const userSchema = new mongoose.Schema({
  name: String,
  image: String,
  decks: {
    linked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deck',
      },
    ],
    created: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deck',
      },
    ],
  },
})

exports.User = mongoose.model('User', userSchema)

const topicSchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  subTopics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubTopic',
    },
  ],
})

exports.Topic = mongoose.model('Topic', topicSchema)

const subTopicSchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  numDecks: Number,
})

exports.SubTopic = mongoose.model('SubTopic', subTopicSchema)

const deckSchema = new mongoose.Schema({
  name: String,
  description: String,
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
  },
  subTopic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubTopic',
  },
  cards: [
    {
      __uid: String,
      term: String,
      definition: String,
    },
  ],
})

exports.Deck = mongoose.model('Deck', deckSchema)

// -----------------------------------------------------------------------------
// DB
// -----------------------------------------------------------------------------

exports.connectToDB = async () => {
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
