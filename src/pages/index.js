import { Topic } from '@/models/Topic'
import { Topics } from '@/components/Topics'
import { Layout } from '@/components/Layout'
import { Container } from '@/components/Container'
import { Features } from '@/components/Features'
import { connectToDB } from '@/utils/connectToDB'
import { transformObjectId } from '@/utils/transformObjectId'

const HomePage = ({ topics }) => {
  return (
    <Layout>
      <div className="mb-4">
        <header className="my-12">
          <div className="flex items-center">
            <svg
              className="w-12 h-12 mr-2 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              ></path>
            </svg>
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
          <h2 className="mb-6 text-3xl font-extrabold leading-none tracking-tight text-gray-900 ">
            Explore Topics
          </h2>
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
  await connectToDB()

  let topics = await Topic.find({})

  // inline transform converts all `._id` (including subdocs) to strings
  topics = topics.map((doc) => {
    const topic = doc.toObject({ transform: transformObjectId })

    return {
      ...topic,
      deckCount: topic.subTopics.reduce(
        (count, { numDecks }) => count + numDecks,
        0
      ),
    }
  })

  return {
    props: { topics },
    revalidate: 1,
  }
}
