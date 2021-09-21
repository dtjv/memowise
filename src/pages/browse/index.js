import Head from 'next/head'
import { useSession } from 'next-auth/client'

import { Decks } from '@/components/Decks'
import { Container } from '@/components/Container'
import { useUser } from '@/hooks/useUser'
import { getDeckList } from '@/lib/data'

const DecksPage = ({ decks = [] }) => {
  const [session] = useSession()
  const { user } = useUser(session)
  const unlinked = decks.filter(
    (deck) =>
      !(user?.decks?.linked ?? []).find((linked) => linked.id === deck.id) &&
      !(user?.decks?.created ?? []).find((created) => created.id === deck.id)
  )

  return (
    <>
      <Head>
        <title>Memowise - All Sets</title>
      </Head>
      <Container>
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900">All Sets</h1>
        <p className="text-xl font-normal text-gray-500">
          A full list of all flashcard sets
        </p>
      </Container>
      <Container>
        {user && (
          <div className="space-y-8">
            {user.decks?.created ? (
              <Decks decks={user.decks.created} created />
            ) : null}
            {user.decks?.linked ? (
              <Decks decks={user.decks.linked} linked />
            ) : null}
            <Decks decks={unlinked} unlinked />
          </div>
        )}
        {!user && <Decks decks={decks} />}
      </Container>
    </>
  )
}

export default DecksPage

export async function getStaticProps() {
  let decks = []

  try {
    decks = await getDeckList()
    decks = decks.map((deck) => {
      delete deck.topic
      delete deck.subTopic
      return deck
    })
  } catch (error) {
    console.error(error)
  }

  return {
    props: { decks },
    revalidate: 1,
  }
}
