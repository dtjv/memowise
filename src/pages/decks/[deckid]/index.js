//import Image from 'next/image'

import { Topic } from '@/models/Topic'
import { Deck } from '@/models/Deck'
import { Nav } from '@/components/Nav'
import { Section } from '@/components/Section'
import { DeckHeader } from '@/components/DeckHeader'
import { CardsList } from '@/components/CardsList'
import { CardsFlip } from '@/components/CardsFlip'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { connectToDB } from '@/utils/connectToDB'
import { transformObjectId } from '@/utils/transformObjectId'

const DeckPage = ({ deck, topic, subTopic }) => {
  const crumbs = [
    { name: topic.name, path: `/browse/${topic.slug}`, isLink: true },
    {
      name: subTopic.name,
      path: `/browse/${topic.slug}/${subTopic.slug}`,
      isLink: true,
    },
    {
      name: deck.name,
      path: '',
      isLink: false,
    },
  ]
  return (
    <div className="max-w-3xl px-4 mx-auto antialiased sm:px-8 md:px-12 lg:px-0">
      <Nav />
      <main>
        <header className="pb-6 mt-10">
          <Breadcrumbs crumbs={crumbs} />
          <DeckHeader deck={deck} />
        </header>
        <Section>
          <CardsFlip cards={deck.cards} />
        </Section>
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
          <CardsList cards={deck.cards} />
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

  return {
    props: {
      deck,
      topic: { name: topic.name, slug: topic.slug },
      subTopic: { name: subTopic.name, slug: subTopic.slug },
    },
  }
}
