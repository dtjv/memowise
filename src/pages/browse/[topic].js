import Link from 'next/link'
import Head from 'next/head'
import { useSession } from 'next-auth/client'

import { Decks } from '@/components/Decks'
import { BreadCrumbs } from '@/components/BreadCrumbs'
import { Container } from '@/components/Container'
import { useUser } from '@/hooks/useUser'
import { getTopic, getTopicList, getDeckList } from '@/lib/data'

const TopicPage = ({ topic, decksBySubTopic }) => {
  const [session] = useSession()
  const { user } = useUser(session)
  const crumbs = [{ name: topic.name, path: '', isLink: false }]
  const renderDecks = topic.subTopics.map((subTopic) => {
    const decks = decksBySubTopic[subTopic.id] ?? []
    const created = decks.filter((deck) =>
      (user?.decks?.created ?? []).find((created) => created.id === deck.id)
    )
    const linked = decks.filter((deck) =>
      (user?.decks?.linked ?? []).find((linked) => linked.id === deck.id)
    )
    const unlinked = decks.filter(
      (deck) =>
        !(user?.decks?.linked ?? []).find((linked) => linked.id === deck.id) &&
        !(user?.decks?.created ?? []).find((created) => created.id === deck.id)
    )

    if (!decks.length) return null

    return (
      <Container key={subTopic.id}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold leading-tight text-gray-900">
            {subTopic.name}
          </h2>
          <Link href={`/browse/${topic.slug}/${subTopic.slug}`}>
            <a className="flex-shrink-0 ml-2">
              <span className="text-base font-semibold text-blue-600">
                View all -&gt;
              </span>
            </a>
          </Link>
        </div>
        {user && (
          <div className="space-y-8">
            <Decks decks={created} created />
            <Decks decks={linked} linked />
            <Decks decks={unlinked} unlinked />
          </div>
        )}
        {!user && <Decks decks={decks} />}
      </Container>
    )
  })

  return (
    <>
      <Head>
        <title>Memowise - {topic.name}</title>
      </Head>
      <Container>
        <BreadCrumbs crumbs={crumbs} />
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900">
          {topic.name}
        </h1>
        <p className="text-xl font-normal text-gray-500">{topic.description}</p>
      </Container>
      {renderDecks}
    </>
  )
}

export default TopicPage

export async function getStaticPaths() {
  let topics = []

  try {
    topics = await getTopicList()
  } catch (error) {
    throw error
  }

  return {
    paths: topics.map((topic) => ({
      params: { topic: topic.slug },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const topic = await getTopic({ slug: params.topic })
  let decks = await getDeckList({ topic: topic.id })

  decks = decks.map((deck) => {
    delete deck.topic
    return deck
  })

  const decksBySubTopic = decks.reduce(
    (hash, deck) =>
      !(deck.subTopic.id in hash)
        ? { ...hash, [deck.subTopic.id]: [deck] }
        : { ...hash, [deck.subTopic.id]: [...hash[deck.subTopic.id], deck] },
    {}
  )

  return {
    props: { topic, decksBySubTopic },
    revalidate: 1,
  }
}
