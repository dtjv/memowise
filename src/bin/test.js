#!/usr/bin/env node

const { Deck, Topic, connectToDB, dump, transformObjectId } = require('./base')

// -----------------------------------------------------------------------------
// start up
// -----------------------------------------------------------------------------
const main = async () => {
  if (!(await connectToDB())) {
    process.exit(1)
  }

  let topic = await Topic.findOne({ slug: 'math' }).populate('subTopics')
  topic = topic.toObject({ transform: transformObjectId })

  let decks = await Deck.find({ topic: topic.id }).populate('subTopic')
  decks = decks.map((deck) => {
    deck = deck.toObject({ transform: transformObjectId })
    deck.topic = deck.topic.toString()
    return deck
  })
  dump(decks)

  const decksBySubTopic = decks.reduce(
    (hash, deck) =>
      !(deck.subTopic.id in hash)
        ? { ...hash, [deck.subTopic.id]: [deck] }
        : { ...hash, [deck.subTopic.id]: [...hash[deck.subTopic.id], deck] },
    {}
  )

  //dump(decksBySubTopic)

  /*
  let user

  user = await User.findOne({ name: 'David Valles' })
    .populate('decks.linked')
    .populate('decks.created')

  dump(user)
  */

  process.exit(0)
}

// -----------------------------------------------------------------------------
// start up
// -----------------------------------------------------------------------------
main()
