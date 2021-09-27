import { getSession } from 'next-auth/client'

import { getUser, updateUser } from '@/lib/data'

//------------------------------------------------------------------------------
// Handler for api calls to `/api/user/:userid`
//------------------------------------------------------------------------------
const handler = async (req, res) => {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).send('Unauthorized')
  }

  if (req.method === 'GET') {
    const user = await getUser(session.user.id)
    return res.status(200).json({ user })
  }

  if (req.method === 'PATCH') {
    await updateUser(session.user.id, { studied: { ...req.body } })
    return res.status(200).json({})
  }

  res.status(404).send(`Unsupported method: ${req.method}`)
}

export default handler
