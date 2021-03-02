import { getSession } from 'next-auth/client'

import { getDeck, updateUser } from '@/lib/data'

//------------------------------------------------------------------------------
// Handler for api calls to `/api/deck/:deckid/link`
//------------------------------------------------------------------------------
export default async (req, res) => {
  const deckId = req.query.deckid

  if (req.method === 'POST') {
    const session = await getSession({ req })

    if (!session) {
      return res.status(401).send('Unauthorized')
    }

    const deck = await getDeck({ id: deckId })

    await updateUser(session.user.id, { linked: deck })

    return res.status(200).json({ deck })
  }

  res.status(404).send(`Unsupported method: ${req.method}`)
}
