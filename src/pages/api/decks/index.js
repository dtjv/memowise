//import { Topic } from '@/models/Topic'
//import { Deck } from '@/models/Deck'
//import { connectToDB } from '@/utils/connectToDB'
//import { transformObjectId } from '@/utils/transformObjectId'
import { dump } from '@/utils/debug'

export default async (req, res) => {
  // Create a Deck
  if (req.method === 'POST') {
    // TODO: check session

    dump(req.body.deck)
    return res.status(200).send('success')
  }

  res.status(404).send('unsupported method')
}
