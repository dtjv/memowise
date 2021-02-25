import { getSession } from 'next-auth/client'

import { getUser } from '@/lib/data'

//------------------------------------------------------------------------------
// Handler for api calls to `/api/user/:userid`
//------------------------------------------------------------------------------
export default async (req, res) => {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).send('Unauthorized')
  }

  if (req.method === 'GET') {
    const user = await getUser(session.user.id)
    return res.status(200).json({ user })
  }

  res.status(404).send(`Unsupported method: ${req.method}`)
}
