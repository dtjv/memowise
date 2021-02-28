#!/usr/bin/env node

const { User, connectToDB, dump } = require('./base')

// -----------------------------------------------------------------------------
// start up
// -----------------------------------------------------------------------------
const main = async () => {
  if (!(await connectToDB())) {
    console.error(`no db connection`)
    process.exit(1)
  }

  const user = await User.create({
    name: 'Mr. White',
  })

  dump(user)

  process.exit(0)
}

// -----------------------------------------------------------------------------
// start up
// -----------------------------------------------------------------------------
main()
