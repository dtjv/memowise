import Head from 'next/head'

import { Container } from '@/components/Container'
import { Decks } from '@/components/Decks'
import { BreadCrumbs } from '@/components/BreadCrumbs'

import { getTopic, getTopicList, getSubTopic, getDeckList } from '@/lib/data'

const SubTopicPage = ({ topic, subTopic, decks }) => {
  const crumbs = [
    { name: topic.name, path: `/browse/${topic.slug}`, isLink: true },
    { name: subTopic.name, path: '', isLink: false },
  ]

  return (
    <>
      <Head>
        <title>
          MemoWise - {topic.name} - {subTopic.name}
        </title>
      </Head>
      <Container>
        <BreadCrumbs crumbs={crumbs} />
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900">
          {subTopic.name}
        </h1>
        <p className="text-xl font-normal text-gray-500">
          {subTopic.description}
        </p>
      </Container>
      <Container>
        <Decks decks={decks} />
      </Container>
    </>
  )
}

export default SubTopicPage

export async function getStaticPaths() {
  const topics = await getTopicList()
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
  const topic = await getTopic({ slug: params.topic })
  const subTopic = await getSubTopic({ slug: params.subtopic })
  let decks = await getDeckList({ subTopic: subTopic.id })

  decks = decks.map((deck) => {
    delete deck.topic
    delete deck.subTopic
    return deck
  })

  return { props: { topic, subTopic, decks } }
}
