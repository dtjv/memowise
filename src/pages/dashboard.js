import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { signOut, useSession } from 'next-auth/client'

import { fetcher } from '@/utils/fetcher'
import { Decks } from '@/components/Decks'
import { Layout } from '@/components/Layout'
import { Container } from '@/components/Container'

const DashboardPage = () => {
  const router = useRouter()
  const [session] = useSession()
  const { data } = useSWR(
    session ? `/api/users/${session.user.id}` : null,
    fetcher
  )

  if (!session) {
    return <div>Access Denied</div>
  }

  if (!data) {
    return <div>Loading...</div>
  }

  const decks = [...data.user.decks.created, ...data.user.decks.linked]

  return (
    <Layout>
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
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-extrabold text-gray-900">
            {session.user.name}
          </h1>
          <button
            onClick={() => signOut({ callbackUrl: router.basePath })}
            className="inline-flex items-center px-3 py-1.5 text-base font-semibold text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
            aria-label="sign-out button"
          >
            Sign out
          </button>
        </div>
      </Container>
      <Container>
        <Decks decks={decks} />
      </Container>
    </Layout>
  )
}

export default DashboardPage
