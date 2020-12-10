const fs = require('fs')
const mongoose = require('mongoose')

/*
const userSchema = new mongoose.Schema({
  name: String,
  sets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CardSet',
    },
  ],
})
*/

const topicSchema = new mongoose.Schema({
  name: String,
  description: String,
  subTopics: [
    {
      name: String,
      description: String,
      numSets: Number,
    },
  ],
})

const cardSetSchema = new mongoose.Schema({
  name: String,
  description: String,
  topic: mongoose.Schema.Types.ObjectId,
  subTopic: mongoose.Schema.Types.ObjectId,
  cards: [
    {
      term: String,
      definition: String,
    },
  ],
})

//const User = mongoose.model('User', userSchema)
const Topic = mongoose.model('Topic', topicSchema)
const CardSet = mongoose.model('CardSet', cardSetSchema)

const MARKER = '__MEMOWISE__'

const parseEnvFile = (data) => {
  const envData = data
    .trim()
    .split('\n')
    .map((line) => line.replace('=', MARKER))
    .map((line) => line.split(MARKER))
    .reduce((result, pair) => {
      const [key, value] = pair
      return { ...result, [key]: value }
    }, {})

  const entries = Object.entries(envData).map((entry) => {
    let [k, v] = entry
    for (const [key, value] of Object.entries(envData)) {
      if (v.includes(`\$${key}`)) {
        v = v.replaceAll(`\$${key}`, value)
      }
    }
    return [k, v]
  })

  return Object.fromEntries(entries)
}

const main = async () => {
  const envData = fs.readFileSync('.env.local', 'utf8')
  const env = parseEnvFile(envData)
  const db = await mongoose.connect(env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })

  const isConnected = db.connections[0].readyState

  if (!isConnected) {
    console.error('failed to connect to db')
    return
  }
  console.log('connected to db')

  /*
  await Topic.create([
    {
      name: 'Math',
      description: 'Learn all things math!',
      subtopics: [
        {
          name: 'Algebra',
          description: 'A few basic algebra flashcards sets.',
          numSets: 0,
        },
        {
          name: 'Geometry',
          description: 'Learn geometry concepts like area and circumference.',
          numSets: 0,
        },
      ],
    },
    {
      name: 'Languages',
      description: 'The fastest way to being proficient in a foreign language.',
      subtopics: [
        {
          name: 'Spanish',
          description: 'Buenos Dias!',
          numSets: 0,
        },
        {
          name: 'Italian',
          description: 'Learn Italian in 3 days!',
          numSets: 0,
        },
      ],
    },
  ])
  */

  const topic = await Topic.findOne({ name: 'Math' })
  const subTopic = topic.subTopics.find(
    (subTopic) => subTopic.name === 'Algebra'
  )

  const math = new CardSet({
    name: 'My Algebra Set',
    description: 'A few Algebra refresher cards',
    topic: topic.id,
    subTopic: subTopic.id,
    cards: [
      {
        term: 'variable',
        definition: 'A symbol or letter used to represent an unknown value.',
      },
      {
        term: 'constant',
        definition: 'A number by itself.',
      },
      {
        term: 'co-efficient',
        definition: 'A number that is multiplied by the value of a variable.',
      },
    ],
  })
  await math.save()

  console.log(math.inspect())

  process.exit(0)
}

main()
