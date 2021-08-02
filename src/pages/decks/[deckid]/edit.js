import Head from 'next/head'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import axios from 'axios'

import { DeckForm } from '@/components/DeckForm'
import { Container } from '@/components/Container'

import { getDeck } from '@/lib/data'

const EditDeckPage = ({ deck }) => {
  const router = useRouter()

  const handleEditDeck = async (updatedDeck) => {
    await axios.patch(`/api/decks/${deck.id}`, { updatedDeck })
    router.push('/dashboard')
  }

  return (
    <>
      <Head>
        <title>Memowise - Edit a Flashcard Set</title>
      </Head>
      <Container>
        <h1 className="text-3xl font-extrabold text-gray-900">Edit a Set</h1>
      </Container>
      <DeckForm deck={deck} submitLabel={'Update'} onSubmit={handleEditDeck} />
    </>
  )
}

export default EditDeckPage

export async function getServerSideProps({ req, res, params }) {
  const session = await getSession({ req })

  if (!session) {
    res.writeHead(302, {
      Location: '/',
    })
    res.end()
    return { props: {} }
  }

  const deck = await getDeck({ id: params.deckid })
  delete deck.topic
  delete deck.subTopic

  return {
    props: {
      deck,
    },
  }
}
