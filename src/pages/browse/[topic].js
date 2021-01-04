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
  const renderSubTopics = topic.subTopics.map((subTopic) => {
    const decks = decksBySubTopic[subTopic.id]

    if (!decks.length) return null

    return (
      <Container key={subTopic.id}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold tracking-tight">{subTopic.name}</h2>
          <Link href={`/browse/${topic.slug}/${subTopic.slug}`}>
            <a>
              <span className="text-base font-semibold text-blue-500">
                View all -{`>`}
              </span>
            </a>
          </Link>
        </div>
        <Decks decks={decksBySubTopic[subTopic.id]} />
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
      {renderSubTopics}
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

  let topic = await Topic.findOne({ slug: params.topic })
  topic = topic.toObject({ transform: transformObjectId })

  // inline transform converts only `._id` (including subdocs) to strings.
  let decks = await Deck.find({ topicId: topic.id })
  decks = decks
    .map((deck) => deck.toObject({ transform: transformObjectId }))
    .map((deck) => ({
      ...deck,
      topicId: deck.topicId.toString(),
      subTopicId: deck.subTopicId.toString(),
    }))

  const decksBySubTopic = topic.subTopics.reduce(
    (result, subTopic) => ({
      ...result,
      [subTopic.id]: decks.filter((deck) => deck.subTopicId === subTopic.id),
    }),
    {}
  )
  return {
    props: { topic, decksBySubTopic },
    revalidate: 1,
  }
}
