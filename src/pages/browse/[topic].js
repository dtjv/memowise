import Link from 'next/link'
import Head from 'next/head'

import { Topic } from '@/models/Topic'
import { Deck } from '@/models/Deck'
import { Decks } from '@/components/Decks'
import { BreadCrumbs } from '@/components/BreadCrumbs'
import { Layout } from '@/components/Layout'
import { Container } from '@/components/Container'
import { BrowseHeader } from '@/components/BrowseHeader'
import { connectToDB } from '@/utils/connectToDB'
import { transformObjectId } from '@/utils/transformObjectId'

const TopicPage = ({ topic, decksBySubTopic }) => {
  const crumbs = [{ name: topic.name, path: '', isLink: false }]
  const renderDecks = topic.subTopics.map((subTopic) => {
    const decks = decksBySubTopic[subTopic.id]

    if (!decks?.length) return null

    return (
      <Container key={subTopic.id}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold tracking-tight">{subTopic.name}</h2>
          <Link href={`/browse/${topic.slug}/${subTopic.slug}`}>
            <a>
              <span className="text-base font-semibold text-blue-600">
                View all -&gt;
              </span>
            </a>
          </Link>
        </div>
        <Decks decks={decks} />
      </Container>
    )
  })

  return (
    <Layout>
      <Head>
        <title>MemoWise - {topic.name}</title>
      </Head>
      <Container>
        <BreadCrumbs crumbs={crumbs} />
        <BrowseHeader name={topic.name} description={topic.description} />
      </Container>
      {renderDecks}
    </Layout>
  )
}

export default TopicPage

export async function getStaticPaths() {
  await connectToDB()

  const topics = await Topic.find({})

  return {
    paths: topics.map((topic) => ({
      params: { topic: topic.slug },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  await connectToDB()

  let topic = await Topic.findOne({ slug: params.topic }).populate('subTopics')
  topic = topic.toObject({ transform: transformObjectId })

  let decks = await Deck.find({ topic: topic.id }).populate('subTopic')
  decks = decks.map((deck) => {
    deck = deck.toObject({ transform: transformObjectId })
    //deck.topic = deck.topic.toString()
    delete deck.topic
    return deck
  })

  const decksBySubTopic = decks.reduce(
    (hash, deck) =>
      !(deck.subTopic.id in hash)
        ? { ...hash, [deck.subTopic.id]: [deck] }
        : { ...hash, [deck.subTopic.id]: [...hash[deck.subTopic.id], deck] },
    {}
  )

  return {
    props: { topic, decksBySubTopic },
    revalidate: 1,
  }
}
