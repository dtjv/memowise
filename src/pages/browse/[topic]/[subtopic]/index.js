import { Topic } from '@/models/Topic'
import { Deck } from '@/models/Deck'
import { Nav } from '@/components/Nav'
import { Section } from '@/components/Section'
import { Decks } from '@/components/Decks'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { connectToDB } from '@/utils/connectToDB'
import { transformObjectId } from '@/utils/transformObjectId'

const SubTopicPage = ({ topic, subTopic, decks }) => {
  const crumbs = [
    { name: topic.name, path: `/browse/${topic.slug}`, isLink: true },
    { name: subTopic.name, path: '', isLink: false },
  ]

  return (
    <div className="max-w-3xl px-4 mx-auto antialiased sm:px-8 md:px-12 lg:px-0">
      <Nav />
      <main>
        <header className="mt-10 mb-6">
          <Breadcrumbs crumbs={crumbs} />
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
