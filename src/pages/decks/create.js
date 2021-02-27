import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import axios from 'axios'

import { DeckForm } from '@/components/DeckForm'
import { Container } from '@/components/Container'

const CreateDeckPage = () => {
  const router = useRouter()
  const [session, loading] = useSession()

  if (!session) {
    return <div>Please Sign In</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  const handleCreateDeck = async (newDeck) => {
    await axios.post(`/api/decks`, { newDeck })
    router.push('/dashboard')
  }

  return (
    <>
      <Head>
        <title>MemoWise - Create New Flashcard Set</title>
      </Head>
      <Container>
        <h1 className="text-3xl font-extrabold text-gray-900">Create a Set</h1>
      </Container>
      <DeckForm submitLabel={'Create'} onSubmit={handleCreateDeck} />
    </>
  )
}

export default CreateDeckPage
