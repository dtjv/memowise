import '@/models/Deck'
import { User } from '@/models/User'
import { connectToDB } from '@/utils/connectToDB'

export default async (req, res) => {
  const {
    query: { userId },
  } = req

  await connectToDB()

  try {
    const user = await User.findById(userId)
      .populate('decks.linked')
      .populate('decks.created')

    return res.status(200).json({ decks: user.decks })
  } catch (error) {
    return res.status(400).json(error)
  }
}
