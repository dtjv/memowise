#!/usr/bin/env node

const { Deck, connectToDB } = require('./base')
const { data } = require('../data/deck')

// -----------------------------------------------------------------------------
// start up
// -----------------------------------------------------------------------------
const main = async () => {
  if (!(await connectToDB())) {
    process.exit(1)
  }

  await Deck.create(data.decks)

  process.exit(0)
}

// -----------------------------------------------------------------------------
// start up
// -----------------------------------------------------------------------------
main()
