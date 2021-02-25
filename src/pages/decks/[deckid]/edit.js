import Head from 'next/head'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import axios from 'axios'

import { DeckForm } from '@/components/DeckForm'

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
        <title>MemoWise - Edit a Flashcard Set</title>
      </Head>
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
