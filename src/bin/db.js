import process from 'process'
import minimist from 'minimist'
import mongoose from 'mongoose'

import { User } from '../models/User'
import { Deck } from '../models/Deck'
import { Topic } from '../models/Topic'
import { SubTopic } from '../models/SubTopic'
import { dump } from '../utils/debug'
import { composeURI, connectToDB, isDBConnected } from '../utils/connectToDB.js'

const usage = `
  Usage: yarn db [options] [file]

  Options:
    --load=<collection> Add to collection from 'file'. (see Notes)
    --drop              Drop --load collection. (default=false)
    --list=<collection> List contents of collection.
    -h, --help          Show this help message.

  Notes:
    1. 'file' must be in ./src/data/.
    2. use 'yarn' or 'npm run' to execute script

  Examples:
    yarn db --load=decks --drop deck-data.js
    yarn db --list=users
`

const showHelp = (message) => {
  if (message) {
    console.log(`\n  ${message}`)
  }
  console.log(usage)
  process.exit(0)
}

const main = async () => {
  const args = minimist(process.argv.slice(2))
  const load = args?.['load']
  const file = args?.['_'].pop()
  const list = args?.['list']
  const drop = Boolean(args?.['drop']) ?? false
  const help = Boolean(args?.['h']) || Boolean(args?.['help'])

  console.log(args)

  if (help) {
    showHelp()
  }

  if (load && !file) {
    showHelp('ERROR: No source file specified')
  }

  await connectToDB(composeURI())

  if (isDBConnected()) {
    console.log('Connected to DB successfully')
  } else {
    console.error(`An error occurred connecting to database.`)
    process.exit(1)
  }

  if (load && drop) {
    console.log(`Dropping collection: ${load}...`)
    try {
      await mongoose.connection.db.dropCollection(load)
      console.log('Collection dropped successfully.')
    } catch (error) {
      // MongoDB code for 'NamespaceNotFound'
      if (error?.code !== 26) {
        console.error('An error occurred dropping collection')
        throw error
      }
    }
  }

  if (load) {
    // read file
    // send to db
  }

  if (list) {
    switch (list.toUpperCase()) {
      case 'USERS':
        const users = await User.find({})
        dump(users)
        break
      case 'DECKS':
      case 'TOPICS':
      case 'SUBTOPICS':
      default:
    }
  }

  process.exit(0)
}

main()
