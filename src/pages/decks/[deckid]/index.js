import Link from 'next/link'
import Image from 'next/image'

import { Topic } from '@/models/Topic'
import { Deck } from '@/models/Deck'
import { Nav } from '@/components/Nav'
import { Section } from '@/components/Section'
import { Cards } from '@/components/Cards'
import { connectToDB } from '@/utils/connectToDB'
import { transformObjectId } from '@/utils/transformObjectId'

const DeckPage = ({ deck, topic, subTopic }) => {
  return (
    <div className="max-w-3xl px-4 mx-auto antialiased sm:px-8 md:px-12 lg:px-0">
      <Nav />
      <main>
        <header className="pb-6 mt-10">
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
            <Link href="/">
              <a>
                <span className="mx-1 text-blue-500">{subTopic.name}</span>
              </a>
            </Link>
          </div>
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 ">
            {deck.name}
          </h1>
          <p className="mb-4 text-xl font-normal tracking-tight text-gray-500">
            {deck.descrption}
          </p>
          <div className="flex items-center">
            <Image
              src="/me.jpg"
              alt="a pic of me"
              width={50}
              height={50}
              className="rounded-full"
            />
            <p className="ml-3 font-semibold">David Valles</p>
          </div>
        </header>
        <Section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 ">
              Cards
            </h2>
            {/*
            <button
              className="p-1 text-blue-500 bg-blue-500 rounded-full bg-opacity-10"
              aria-label="add set to my account"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </button>
            */}
          </div>
          <Cards cards={deck.cards} />
        </Section>
      </main>
      <footer></footer>
    </div>
  )
}

export default DeckPage

export async function getStaticPaths() {
  await connectToDB()

  const decks = await Deck.find({})

  return {
    paths: decks.map((deck) => ({
      params: { deckid: deck._id.toString() },
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  let deck = await Deck.findById(params.deckid)
  deck = deck.toObject({ transform: transformObjectId })
  deck.topicId = deck.topicId.toString()
  deck.subTopicId = deck.subTopicId.toString()

  let topic = await Topic.findById(deck.topicId)
  topic = topic.toObject({ transform: transformObjectId })

  const subTopic = topic.subTopics.find(
    (subTopic) => subTopic.id === deck.subTopicId.toString()
  )

  return { props: { deck, topic, subTopic } }
}
