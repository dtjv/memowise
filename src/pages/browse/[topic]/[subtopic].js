import Head from 'next/head'

import { Deck } from '@/models/Deck'
import { Topic } from '@/models/Topic'
import { SubTopic } from '@/models/SubTopic'
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

  const topics = await Topic.find({}).populate('subTopics')
  const paths = topics.flatMap((topic) =>
    topic.subTopics.map((subTopic) => ({
      params: {
        topic: topic.slug,
        subtopic: subTopic.slug,
      },
    }))
  )

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  await connectToDB()

  let topic = await Topic.findOne({ slug: params.topic })
  topic = topic.toObject({ transform: transformObjectId })
  delete topic.subTopics

  let subTopic = await SubTopic.findOne({ slug: params.subtopic })
  subTopic = subTopic.toObject({ transform: transformObjectId })

  let decks = await Deck.find({ subTopic: subTopic.id })
  decks = decks.map((deck) => {
    deck = deck.toObject({ transform: transformObjectId })
    delete deck.topic
    delete deck.subTopic
    return deck
  })

  return { props: { topic, subTopic, decks } }
}
