import mongoose from 'mongoose'

const connection = {}

export const connectToDB = async () => {
  if (connection.isConnected) {
    return
  }

  const db = await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })

  connection.isConnected = db.connections[0].readyState
}

export const isDBConnected = () => !!connection.isConnected
