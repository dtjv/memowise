import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/client'

import { useUser } from '@/hooks/useUser'
import { Decks } from '@/components/Decks'
import { Container } from '@/components/Container'
import { NotAuthorized } from '@/components/NotAuthorized'

const DashboardPage = () => {
  const router = useRouter()
  const [session] = useSession()
  const { user, isLoading } = useUser(session)

  if (!session) {
    return <NotAuthorized />
  }

  if (isLoading) {
    return <Skeleton />
  }

  return (
    <>
      <Head>
        <title>Memowise - {session.user.name}</title>
      </Head>
      <Container>
        <Image
          src={session.user.image}
          className="rounded-full"
          alt={`avatar for user ${session.user.name}`}
          width={112}
          height={112}
        />
        <div className="flex items-start justify-between mt-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              {session.user.name}
            </h1>
            <button
              onClick={() => signOut({ callbackUrl: router.basePath })}
              className="mt-4 inline-flex flex-none items-center px-3 py-1.5 text-base font-semibold text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
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
      {user?.decks?.created ? (
        <Container>
          <h2 className="mb-6 text-2xl font-bold leading-tight text-gray-900">
            Created By You
          </h2>
          <Decks decks={user.decks.created} created />
        </Container>
      ) : null}
      {user?.decks?.linked ? (
        <Container>
          <h2 className="mb-6 text-2xl font-bold leading-tight text-gray-900">
            Added to Your Collection
          </h2>
          <Decks decks={user.decks.linked} linked />
        </Container>
      ) : null}
    </>
  )
}

export default DashboardPage

const Skeleton = () => {
  return (
    <>
      <div className="animate-pulse">
        <Container>
          <div className="space-y-4">
            <div className="bg-gray-300 rounded-full w-28 h-28"></div>
            <div className="flex justify-between">
              <div className="w-1/4 h-10 bg-gray-300 rounded"></div>
              <div className="w-24 h-10 bg-gray-300 rounded"></div>
            </div>
            <div className="w-24 h-10 bg-gray-300 rounded"></div>
          </div>
        </Container>
        <Container>
          <div className="space-y-8">
            <div className="w-1/4 h-8 bg-gray-300 rounded"></div>
            <div className="w-full bg-gray-300 rounded-xl h-36"></div>
            <div className="w-full bg-gray-300 rounded-xl h-36"></div>
            <div className="w-full bg-gray-300 rounded-xl h-36"></div>
          </div>
        </Container>
        <Container>
          <div className="space-y-8">
            <div className="w-1/4 h-8 bg-gray-300 rounded"></div>
            <div className="w-full bg-gray-300 rounded-xl h-36"></div>
            <div className="w-full bg-gray-300 rounded-xl h-36"></div>
            <div className="w-full bg-gray-300 rounded-xl h-36"></div>
          </div>
        </Container>
      </div>
    </>
  )
}
