//import { getSession } from 'next-auth'

import { createDeck } from '@/lib/data'

//------------------------------------------------------------------------------
// Handler for api calls to `/api/deck`
//------------------------------------------------------------------------------
export default async (req, res) => {
  if (req.method === 'POST') {
    const deck = await createDeck(req.body.deck)
    return res.status(200).json({ deck })
  }

  if (req.method === 'GET') {
    // is this necessary?
  }

  res.status(404).send(`Unsupported method: ${req.method}`)
}
