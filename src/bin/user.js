#!/usr/bin/env node

const { User, Deck, connectToDB, dump } = require('./base')

// -----------------------------------------------------------------------------
// main
// -----------------------------------------------------------------------------

const main = async () => {
  if (!(await connectToDB())) {
    console.error(`no db connection`)
    process.exit(1)
  }

  //const user = await User.findOne({ name: 'David Valles' })
  const user = await User.create({ name: 'David Valles' })
  dump(user, '<-- user')
  const decks = await Deck.find({})

  if (user?._id) {
    //    user.decks = {
    //      linked: [],
    //      created: [],
    //    }

    user.decks.linked.push(decks[0]._id)
    user.decks.linked.push(decks[1]._id)
    user.decks.linked.push(decks[2]._id)

    user.decks.created.push(decks[3]._id)
    user.decks.created.push(decks[4]._id)
    user.decks.created.push(decks[5]._id)

    await user.save()
  }

  process.exit(0)
}

// -----------------------------------------------------------------------------
// start up
// -----------------------------------------------------------------------------
main()
