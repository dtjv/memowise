import Link from 'next/link'

import { Topic } from '@/models/Topic'
import { Deck } from '@/models/Deck'
import { Nav } from '@/components/Nav'
import { Decks } from '@/components/Decks'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Section } from '@/components/Section'
import { connectToDB } from '@/utils/connectToDB'
import { transformObjectId } from '@/utils/transformObjectId'

const TopicPage = ({ topic, decksBySubTopic }) => {
  const crumbs = [{ name: topic.name, path: '', isLink: false }]
  const renderSubTopics = topic.subTopics.map((subTopic) => {
    const decks = decksBySubTopic[subTopic.id]

    if (!decks.length) return null

    return (
      <Section key={subTopic.id}>
        <div className="flex items-center justify-between">
          <h2 className="mb-6 text-3xl font-bold tracking-tight">
            {subTopic.name}
          </h2>
          <Link href={`/browse/${topic.slug}/${subTopic.slug}`}>
            <a>
              <span className="text-base font-semibold text-blue-500">
                View all -{`>`}
              </span>
            </a>
          </Link>
        </div>
        <Decks decks={decksBySubTopic[subTopic.id]} />
      </Section>
    )
  })

  return (
    <div className="max-w-3xl px-4 mx-auto antialiased sm:px-8 md:px-12 lg:px-0">
      <Nav />
      <main>
        <header className="mt-10 mb-6">
          <Breadcrumbs crumbs={crumbs} />
          <h1 className="mb-4 text-4xl font-extrabold text-gray-900">
            {topic.name}
          </h1>
          <p className="text-2xl font-normal tracking-tight text-gray-500">
            {topic.description}
          </p>
        </header>
        {renderSubTopics}
      </main>
      <footer></footer>
    </div>
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
    fallback: true,
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
