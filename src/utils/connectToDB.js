import process from 'process'
import mongoose from 'mongoose'

const connection = {}

export const connectToDB = async (uri) => {
  let db = null

  if (connection.isConnected === 1) return

  try {
    db = await mongoose.connect(uri ?? process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
  } catch (error) {
    console.error(error)
    return
  }

  connection.isConnected = db.connections[0].readyState
}

export const isDBConnected = () => connection.isConnected === 1

export const composeURI = () =>
  process.env.DB_URI.replace(/\$DB_USER/, process.env.DB_USER)
    .replace(/\$DB_PASS/, process.env.DB_PASS)
    .replace(/\$DB_NAME/, process.env.DB_NAME)
