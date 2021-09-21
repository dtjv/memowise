import Link from 'next/link'
import pluralize from 'pluralize'

import { Topics } from '@/components/Topics'
import { Container } from '@/components/Container'
import { Features } from '@/components/Features'
import { CapIcon } from '@/components/icons/cap'
import { getTopicList, getDeckList } from '@/lib/data'

const HomePage = ({ topics, numDecks }) => {
  return (
    <>
      <header className="my-12">
        <div className="flex items-center">
          <CapIcon className="w-12 h-12 mr-2 text-blue-600" />
          <p className="text-3xl font-semibold text-gray-900">memowise</p>
        </div>
        <h1 className="my-8 text-4xl font-extrabold tracking-tight text-gray-900 ">
          Learn using a modern approach to a proven technique.
        </h1>
        <p className="mb-10 text-lg font-medium text-gray-500">
          Memowise, <em>the</em> smart Flashcard app, uses algorithm-based logic
          to accelerate your learning and improve retention.
        </p>
        <a
          href="#explore-topics"
          className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        >
          Get started
        </a>
      </header>
      <div>
        <Features />
      </div>
      <div className="my-4 border-b border-gray-200" />
      <Container id="explore-topics">
        <h2 className="mb-6 text-3xl font-bold leading-none tracking-tight text-gray-900 ">
          Explore Topics
        </h2>
        <p className="mb-8 text-lg font-medium text-gray-500">
          Begin your learning journey below, by browsing topics of interest.
        </p>
        <Topics topics={topics} />
      </Container>
      <div className="my-4 border-b border-gray-200" />
      <Container>
        <div className="p-6 text-white shadow-lg rounded-2xl bg-gradient-to-br from-gray-400 to-gray-700">
          <h2 className="text-2xl font-semibold">All Sets</h2>
          <p className="mb-4 text-sm font-medium uppercase text-shadow">
            {pluralize('set', numDecks, true)}
          </p>
          <p className="mb-8 font-medium text-shadow">
            Check out all the decks Memowise has to offer - from Spanish terms
            to programming concepts and cooking skills.
          </p>
          <Link href="/browse">
            <a className="inline-flex items-center px-4 py-2 font-semibold bg-gray-800 rounded-lg bg-opacity-50 hover:bg-opacity-90 focus:outline-none focus:bg-opacity-90">
              Explore all sets
            </a>
          </Link>
        </div>
      </Container>
    </>
  )
}

export default HomePage

export async function getStaticProps() {
  let topics = []
  let decks = []

  try {
    topics = await getTopicList()
    decks = await getDeckList()
  } catch (error) {
    console.error(error)
  }

  return {
    props: { topics, numDecks: decks.length },
    revalidate: 1,
  }
}
