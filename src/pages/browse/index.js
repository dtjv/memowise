import Head from 'next/head'

import { Decks } from '@/components/Decks'
import { Container } from '@/components/Container'
import { BrowseHeader } from '@/components/BrowseHeader'

import { getDeckList } from '@/lib/data'

const DecksPage = ({ decks }) => {
  return (
    <>
      <Head>
        <title>MemoWise - All Sets</title>
      </Head>
      <Container>
        <BrowseHeader
          name="All Sets"
          description="A full list of all flashcard sets."
        />
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
