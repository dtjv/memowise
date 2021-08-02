import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import axios from 'axios'

import { DeckForm } from '@/components/DeckForm'
import { Container } from '@/components/Container'
import { NotAuthorized } from '@/components/NotAuthorized'

const CreateDeckPage = () => {
  const router = useRouter()
  const [session] = useSession()

  if (!session) {
    return <NotAuthorized />
  }

  const handleCreateDeck = async (newDeck) => {
    await axios.post(`/api/decks`, { newDeck })
    router.push('/dashboard')
  }

  return (
    <>
      <Head>
        <title>Memowise - Create New Flashcard Set</title>
      </Head>
      <Container>
        <h1 className="text-3xl font-extrabold text-gray-900">Create a Set</h1>
      </Container>
      <DeckForm submitLabel={'Create'} onSubmit={handleCreateDeck} />
    </>
  )
}

export default CreateDeckPage
