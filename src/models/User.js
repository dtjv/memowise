import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: String,
  image: String,
})

export const User = mongoose.models.User || mongoose.model('User', userSchema)
