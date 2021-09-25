import mongoose from 'mongoose'

const connection = {}

export const connectToDB = async () => {
  let db = null

  if (connection.isConnected === 1) return

  try {
    db = await mongoose.connect(process.env.DB_URI, {
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
