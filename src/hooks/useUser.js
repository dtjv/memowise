import useSWR from 'swr'

import { fetcher } from '@/utils/fetcher'

export const useUser = (session) => {
  const { data, error } = useSWR(
    session?.user ? `/api/users/${session.user.id}` : null,
    fetcher
  )

  return {
    user: data?.user,
    isLoading: !error && !data,
    isError: error,
  }
}
