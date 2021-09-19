import { getSession } from 'next-auth/client'

import { getDeck, updateUser } from '@/lib/data'

//------------------------------------------------------------------------------
// Handler for api calls to `/api/deck/:deckid/link`
//------------------------------------------------------------------------------
const handler = async (req, res) => {
  const deckId = req.query.deckid

  if (req.method === 'POST') {
    const session = await getSession({ req })

    if (!session) {
      return res.status(401).send('Unauthorized')
    }

    const deck = await getDeck({ id: deckId })

    if (!deck) {
      return res.status(404).send('Set not found')
    }

    await updateUser(session.user.id, { linked: deckId })

    return res.status(200).json({})
  }

  res.status(404).send(`Unsupported method: ${req.method}`)
}

export default handler
