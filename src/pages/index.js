import Link from 'next/link'

import { Topics } from '@/components/Topics'
import { Layout } from '@/components/Layout'
import { Container } from '@/components/Container'
import { Features } from '@/components/Features'
import { CapIcon } from '@/components/icons/cap'
import { getTopicList } from '@/lib/data'

const HomePage = ({ topics }) => {
  return (
    <Layout>
      <div className="mb-4">
        <header className="my-12">
          <div className="flex items-center">
            <CapIcon className="w-12 h-12 mr-2 text-blue-600" />
            <p className="text-3xl font-semibold text-gray-900">memowise</p>
          </div>
          <h1 className="my-8 text-4xl font-extrabold tracking-tight text-gray-900 ">
            Learn all the things with a modern approach to a proven technique.
          </h1>
          <p className="mb-10 text-lg font-medium text-gray-500">
            Memowise, <em>the</em> smart Flashcard app, uses algorithm-based
            logic to accelerate your learning and improve retention.
          </p>
          <a
            href="#explore-topics"
            className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            Get started
          </a>
        </header>
        <Features />
        <Container id="explore-topics">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-3xl font-extrabold leading-none tracking-tight text-gray-900 ">
              Explore Topics
            </h2>
            <Link href="/browse">
              <a>
                <span className="text-base font-semibold text-blue-600">
                  View all sets -&gt;
                </span>
              </a>
            </Link>
          </div>
          <p className="mb-8 text-lg font-medium text-gray-500">
            Begin your learning journey below, by browsing topics of interest.
          </p>
          <Topics topics={topics} />
        </Container>
      </div>
    </Layout>
  )
}

export default HomePage

export async function getStaticProps() {
  let topics = []

  try {
    topics = await getTopicList()
  } catch (error) {
    console.error(error)
  }

  return {
    props: { topics },
    revalidate: 1,
  }
}
