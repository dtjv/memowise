import Head from 'next/head'

import { Decks } from '@/components/Decks'
import { Container } from '@/components/Container'

import { getDeckList } from '@/lib/data'

const DecksPage = ({ decks }) => {
  return (
    <>
      <Head>
        <title>MemoWise - All Sets</title>
      </Head>
      <Container>
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900">All Sets</h1>
        <p className="text-xl font-normal text-gray-500">
          A full list of all flashcard sets
        </p>
      </Container>
      <Container>
        <Decks decks={decks} />
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
