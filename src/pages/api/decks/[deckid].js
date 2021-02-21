//import { getSession } from 'next-auth'

import { getDeck, updateDeck, deleteDeck } from '@/lib/data'

//------------------------------------------------------------------------------
// Handler for api calls to `/api/deck/:deckid`
//------------------------------------------------------------------------------
export default async (req, res) => {
  const deckId = req.query.deckid

  if (req.method === 'GET') {
    const deck = await getDeck(deckId)
    return res.status(200).json({ deck })
  }

  if (req.method === 'PATCH') {
    const deck = await updateDeck(deckId, req.query.payload)
    return res.status(200).json({ deck })
  }

  if (req.method === 'DELETE') {
    await deleteDeck(deckId)
    return res.status(200)
  }

  res.status(404).send(`Unsupported method: ${req.method}`)
}
