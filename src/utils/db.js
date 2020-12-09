const fs = require('fs')
const mongoose = require('mongoose')

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

  // proceed....
}

main()
