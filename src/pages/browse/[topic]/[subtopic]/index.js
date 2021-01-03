import Head from 'next/head'

import { Topic } from '@/models/Topic'
import { Deck } from '@/models/Deck'
import { Layout } from '@/components/Layout'
import { Container } from '@/components/Container'
import { BrowseHeader } from '@/components/BrowseHeader'
import { Decks } from '@/components/Decks'
import { BreadCrumbs } from '@/components/BreadCrumbs'
import { connectToDB } from '@/utils/connectToDB'
import { transformObjectId } from '@/utils/transformObjectId'

const SubTopicPage = ({ topic, subTopic, decks }) => {
  const crumbs = [
    { name: topic.name, path: `/browse/${topic.slug}`, isLink: true },
    { name: subTopic.name, path: '', isLink: false },
  ]

  return (
    <Layout>
      <Head>
        <title>
          MemoWise - {topic.name} - {subTopic.name}
        </title>
      </Head>
      <Container>
        <BreadCrumbs crumbs={crumbs} />
        <BrowseHeader name={subTopic.name} description={subTopic.description} />
      </Container>
      <Container>
        <Decks decks={decks} />
      </Container>
    </Layout>
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
