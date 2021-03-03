import axios from 'axios'

import { dump } from '@/utils/debug'

export const fetcher = async (url) => {
  try {
    const res = await axios.get(url)
    return res.data
  } catch (err) {
    const error = new Error(err.message ?? `Api Error: ${url}`)

    if (err.response) {
      error.data = err.response.data
      error.status = err.response.status
      error.headers = err.response.headers
    }

    dump(error)
    throw error
  }
}
