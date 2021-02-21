import Head from 'next/head'

import { Deck } from '@/models/Deck'
import { Decks } from '@/components/Decks'
import { Layout } from '@/components/Layout'
import { Container } from '@/components/Container'
import { BrowseHeader } from '@/components/BrowseHeader'
import { connectToDB } from '@/utils/connectToDB'
import { transformObjectId } from '@/utils/transformObjectId'

const DecksPage = ({ decks }) => {
  return (
    <Layout>
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
    </Layout>
  )
}

export default DecksPage

export async function getStaticProps() {
  await connectToDB()

  let decks = await Deck.find({})
  decks = decks.map((deck) => {
    deck = deck.toObject({ transform: transformObjectId })
    delete deck.topic
    delete deck.subTopic
    return deck
  })

  return {
    props: { decks },
    revalidate: 1,
  }
}
