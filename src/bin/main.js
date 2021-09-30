import minimist from 'minimist'

import { loadDecks } from './data'
import { resetUserDecks } from './user'

const usage = `
  Usage: yarn db [options]

  Options:
    --user=<id>   Set user's 'decks' field
    --data        Load topics, sub-topics and decks
    -h, --help
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
  const userId = args?.['user']
  const data = Boolean(args?.['data'])
  const help = Boolean(args?.['h']) || Boolean(args?.['help'])

  if (help) {
    showHelp()
  }

  let rc = { error: undefined, success: true }

  if (data) {
    rc = await loadDecks()
  }

  if (userId) {
    rc = await resetUserDecks(user)
  }

  if (rc.success) {
    process.exit(0)
  } else {
    console.error(rc.error)
    process.exit(1)
  }
}

main()
