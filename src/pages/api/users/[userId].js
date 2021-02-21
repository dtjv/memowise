//import { getSession } from 'next-auth'

import { getUser, updateUser } from '@/lib/data'

//------------------------------------------------------------------------------
// Handler for api calls to `/api/user/:userid`
//------------------------------------------------------------------------------
export default async (req, res) => {
  const userId = req.query.userid

  if (req.method === 'GET') {
    const user = await getUser(userId)
    return res.status(200).json({ user })
  }

  if (req.method === 'PATCH') {
    const user = await updateUser(userId, payload)
    return res.status(200).json({ user })
  }

  res.status(404).send(`Unsupported method: ${req.method}`)
}
