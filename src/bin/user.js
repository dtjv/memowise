#!/usr/bin/env node

const { User, Deck, connectToDB, dump, transformObjectId } = require('./base')

// -----------------------------------------------------------------------------
// main
// -----------------------------------------------------------------------------

const main = async () => {
  if (!(await connectToDB())) {
    console.error(`no db connection`)
    process.exit(1)
  }

  /*
  const user = await User.findOne({ name: 'David Valles' })
  const decks = await Deck.find({})

  if (user?._id) {
    user.decks = {
      linked: [],
      created: [],
    }

    user.decks.linked.push(decks[0]._id)
    user.decks.linked.push(decks[1]._id)
    user.decks.linked.push(decks[2]._id)

    user.decks.created.push(decks[3]._id)
    user.decks.created.push(decks[4]._id)
    user.decks.created.push(decks[5]._id)

    await user.save()
  }
  */

  const user = await User.findById('603c5a2c0ec7c65f3484df98')
    .populate('decks.linked')
    .populate('decks.created')

  const userObj = user.toObject({ transform: transformObjectId })
  dump(userObj)
  process.exit(0)
}

// -----------------------------------------------------------------------------
// start up
// -----------------------------------------------------------------------------
main()
