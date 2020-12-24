import Link from 'next/link'

import { Topic } from '@/models/Topic'
import { Deck } from '@/models/Deck'
import { Nav } from '@/components/Nav'
import { Section } from '@/components/Section'
import { Decks } from '@/components/Decks'
import { connectToDB } from '@/utils/connectToDB'
import { transformObjectId } from '@/utils/transformObjectId'

const SubTopicPage = ({ topic, subTopic, decks }) => {
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
            <Link href="/">
              <a>
                <span className="mx-1 text-blue-500">{topic.name}</span>
              </a>
            </Link>
            <span className="mx-1">/</span>
            <span className="mx-1">{subTopic.name}</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold text-gray-900 ">
            {subTopic.name}
          </h1>
          <p className="text-2xl font-normal tracking-tight text-gray-500">
            {subTopic.description}
          </p>
        </header>
        <Section>
          <Decks decks={decks} />
        </Section>
      </main>
      <footer></footer>
    </div>
  )
}

export default SubTopicPage

export async function getStaticPaths() {
  await connectToDB()

  const topics = await Topic.find({})
  const subTopics = topics.flatMap((topic) => {
    return topic.subTopics.map((subTopic) => {
      return {
        params: {
          topic: topic.slug,
          subtopic: subTopic.slug,
        },
      }
    })
  })

  return {
    paths: subTopics,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  await connectToDB()

  let topic = await Topic.findOne({ slug: params.topic })
  topic = topic.toObject({ transform: transformObjectId })

  let subTopic = topic.subTopics.find(
    (subTopic) => subTopic.slug === params.subtopic
  )

  // inline transform converts only `._id` (including subdocs) to strings.
  let decks = await Deck.find({ subTopicId: subTopic.id })
  decks = decks
    .map((deck) => deck.toObject({ transform: transformObjectId }))
    .map((deck) => ({
      ...deck,
      topicId: deck.topicId.toString(),
      subTopicId: deck.subTopicId.toString(),
    }))

  return { props: { topic, subTopic, decks } }
}
