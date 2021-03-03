import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/client'
import axios from 'axios'

import { DeckForm } from '@/components/DeckForm'
import { Container } from '@/components/Container'

const CreateDeckPage = () => {
  const router = useRouter()
  const [session] = useSession()

  if (!session) {
    return (
      <>
        <Head>
          <title>Not Authorized</title>
        </Head>
        <Container>
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900">
            Not Authorized
          </h1>
          <p className="text-xl font-normal text-gray-500">
            Please{' '}
            <button className="text-blue-600" onClick={() => signIn()}>
              Sign in
            </button>{' '}
            or return to{' '}
            <Link href="/">
              <a className="text-blue-600">Home Page.</a>
            </Link>
          </p>
        </Container>
      </>
    )
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
