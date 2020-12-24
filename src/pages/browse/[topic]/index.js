import Link from 'next/link'

import { Topic } from '@/models/Topic'
import { Deck } from '@/models/Deck'
import { Nav } from '@/components/Nav'
import { Decks } from '@/components/Decks'
import { Section } from '@/components/Section'
import { connectToDB } from '@/utils/connectToDB'
import { transformObjectId } from '@/utils/transformObjectId'

const TopicPage = ({ topic, decksBySubTopic }) => {
  const renderSubTopics = topic.subTopics.map((subTopic) => {
    return (
      <Section key={subTopic.id}>
        <h2 className="mb-6 text-3xl font-bold tracking-tight">
          {subTopic.name}
        </h2>
        <Decks decks={decksBySubTopic[subTopic.id]} />
      </Section>
    )
  })

  return (
    <div className="max-w-3xl px-4 mx-auto antialiased sm:px-8 md:px-12 lg:px-0">
      <Nav />
      <main>
        <header className="mt-10 mb-6">
          <div className="flex items-center mb-4 text-sm font-medium text-gray-700">
            <Link href="/">
              <a>
                <svg
                  className="w-4 h-4 mr-1 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  ></path>
                </svg>
              </a>
            </Link>
            <span className="mx-1">/</span>
            <span className="mx-1">{topic.name}</span>
          </div>
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
