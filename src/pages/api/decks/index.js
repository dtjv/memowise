import { getSession } from 'next-auth/client'

import { createDeck, updateUser } from '@/lib/data'

//------------------------------------------------------------------------------
// Handler for api calls to `/api/deck`
//------------------------------------------------------------------------------
const handler = async (req, res) => {
  if (req.method === 'POST') {
    const session = await getSession({ req })

    if (!session) {
      return res.status(401).send('Unauthorized')
    }

    const { newDeck } = req.body
    const deck = await createDeck(newDeck)

    await updateUser(session.user.id, { created: deck })

    return res.status(200).json({ deck })
  }

  res.status(404).send(`Unsupported method: ${req.method}`)
}

export default handler
