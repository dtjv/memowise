#!/usr/bin/env node

const { User, connectToDB, dump } = require('./base')

// -----------------------------------------------------------------------------
// start up
// -----------------------------------------------------------------------------
const main = async () => {
  if (!(await connectToDB())) {
    process.exit(1)
  }

  let user

  user = await User.findOne({ name: 'David Valles' })
    .populate('decks.linked')
    .populate('decks.created')

  dump(user)

  process.exit(0)
}

// -----------------------------------------------------------------------------
// start up
// -----------------------------------------------------------------------------
main()
