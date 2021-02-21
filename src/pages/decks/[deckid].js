//import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'

import { Deck } from '@/models/Deck'
import { Layout } from '@/components/Layout'
import { Container } from '@/components/Container'
import { DeckHeader } from '@/components/DeckHeader'
import { Cards } from '@/components/Cards'
import { CardsFlip } from '@/components/CardsFlip'
//import { BreadCrumbs } from '@/components/BreadCrumbs'
import { connectToDB } from '@/utils/connectToDB'
import { transformObjectId } from '@/utils/transformObjectId'

const DeckPage = ({ deck }) => {
  /*
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
  */
  return (
    <Layout>
      <Head>
        <title>MemoWise - {deck.name}</title>
      </Head>
      <Container>
        <DeckHeader deck={deck} />
      </Container>
      <Container>
        <CardsFlip cards={deck.cards} />
      </Container>
      <Container>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 ">
            Cards
          </h2>
          <Link href={`/decks/${deck.id}/quiz`}>
            <a className="inline-flex items-center px-5 py-2 font-semibold text-white bg-gray-900 text-md rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-gray-700">
              Take Quiz
            </a>
          </Link>
          {/*
          <button
            className="p-1 text-blue-600 bg-blue-600 rounded-full bg-opacity-10"
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
      </Container>
    </Layout>
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
    fallback: false, // TODO: make true
  }
}

export async function getStaticProps({ params }) {
  await connectToDB()

  let deck = await Deck.findById(params.deckid)
    .populate('topic')
    .populate('subTopic')
  deck = deck.toObject({ transform: transformObjectId })
  delete deck.topic?.subTopics

  return { props: { deck } }
}
