import { getSession } from 'next-auth/client'

import { getDeck, updateDeck, deleteDeck, updateUser } from '@/lib/data'

//------------------------------------------------------------------------------
// Handler for api calls to `/api/deck/:deckid`
//------------------------------------------------------------------------------
const handler = async (req, res) => {
  const deckId = req.query.deckid

  if (req.method === 'GET') {
    const deck = await getDeck({ id: deckId })
    return res.status(200).json({ deck })
  }

  if (req.method === 'PATCH') {
    const session = await getSession({ req })

    if (!session) {
      return res.status(401).send('Unauthorized')
    }

    const deck = await updateDeck(deckId, req.body.updatedDeck)
    return res.status(200).json({ deck })
  }

  if (req.method === 'DELETE') {
    const session = await getSession({ req })

    if (!session) {
      return res.status(401).send('Unauthorized')
    }

    await deleteDeck(deckId)
    await updateUser(session.user.id, { remove: { deckId } })

    return res.status(200).json({})
  }

  res.status(404).send(`Unsupported method: ${req.method}`)
}

export default handler
