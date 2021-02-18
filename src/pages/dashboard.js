import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { signOut, useSession, getSession } from 'next-auth/client'

import { Deck } from '@/models/Deck'
import { Decks } from '@/components/Decks'
import { Layout } from '@/components/Layout'
import { Container } from '@/components/Container'
import { connectToDB } from '@/utils/connectToDB'
import { transformObjectId } from '@/utils/transformObjectId'

const DashBoardPage = ({ decks = [] }) => {
  const router = useRouter()
  const [session] = useSession()

  if (!session) {
    return <div>Access Denied</div>
  }

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

export default DashBoardPage

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return { props: {} }
  }

  await connectToDB()

  let decks = await Deck.find({ creator: session.user.id })
  decks = decks
    .map((deck) => deck.toObject({ transform: transformObjectId }))
    .map((deck) => ({
      ...deck,
      creator: deck.creator.toString(),
      topicId: deck.topicId.toString(),
      subTopicId: deck.subTopicId.toString(),
    }))

  return {
    props: { decks },
  }
}
