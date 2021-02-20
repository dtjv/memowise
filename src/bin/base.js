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

// -----------------------------------------------------------------------------
// Models
// -----------------------------------------------------------------------------
const userSchema = new mongoose.Schema(
  {
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
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id
        delete ret._id
      },
    },
  }
)

exports.User = mongoose.model('User', userSchema)

const topicSchema = new mongoose.Schema(
  {
    name: String,
    slug: String,
    description: String,
    subTopics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubTopic',
      },
    ],
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id
        delete ret._id
      },
    },
  }
)

exports.Topic = mongoose.model('Topic', topicSchema)

const subTopicSchema = new mongoose.Schema(
  {
    name: String,
    slug: String,
    description: String,
    numDecks: Number,
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id
        delete ret._id
      },
    },
  }
)

exports.SubTopic = mongoose.model('SubTopic', subTopicSchema)

const deckSchema = new mongoose.Schema(
  {
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
        term: String,
        definition: String,
      },
    ],
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id
        delete ret._id
      },
    },
  }
)

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
