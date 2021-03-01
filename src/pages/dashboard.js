import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { signOut, useSession } from 'next-auth/client'

import { fetcher } from '@/utils/fetcher'
import { Decks } from '@/components/Decks'
import { Container } from '@/components/Container'

const DashboardPage = () => {
  const router = useRouter()
  const [session] = useSession()
  const { data } = useSWR(
    session?.user ? `/api/users/${session.user.id}` : null,
    fetcher
  )

  if (!session) {
    return <div>Access Denied</div>
  }

  if (!data) {
    return <div>Loading...</div>
  }

  const decks = [
    ...(data?.user?.decks?.created || []),
    ...(data?.user?.decks?.linked || []),
  ]

  return (
    <>
      <Head>
        <title>MemoWise - {session.user.name}</title>
      </Head>
      <Container>
        <Image
          src={session.user.image}
          className="rounded-full"
          alt={`avatar for user ${session.user.name}`}
          width={100}
          height={100}
        />
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              {session.user.name}
            </h1>
            <button
              onClick={() => signOut({ callbackUrl: router.basePath })}
              className="inline-flex flex-none items-center px-3 py-1.5 text-base font-semibold text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
              aria-label="sign-out button"
            >
              Sign out
            </button>
          </div>
          <Link href="/decks/create">
            <a className="inline-flex flex-none items-center px-3 py-1.5 text-base font-semibold text-white bg-blue-700 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800">
              Create
            </a>
          </Link>
        </div>
      </Container>
      <Decks decks={decks} user={data.user} />
    </>
  )
}

export default DashboardPage
