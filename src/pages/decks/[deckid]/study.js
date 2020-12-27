import { useRouter } from 'next/router'
import useSWR from 'swr'
import Image from 'next/image'

import { Nav } from '@/components/Nav'
import { Breadcrumbs } from '@/components/Breadcrumbs'

//import { dump } from '@/utils/debug'

const fetcher = async (url) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }

  return data
}

// [x] i got a deck
// [ ] i need to compute what card to show
// [ ] i need to compute list of answer choices
//
// tbd...
// [ ] save each play to db?
// [ ] to compute next card, i need a history of play results
//
// hmm...
// - do i do all this in memory?
// - do i store all this in local storage, then batch update db?
//
// render a card + choices
// user makes a choice, then
//   POST results to /api/deckid/study
//     { cardId, isCorrectAnswer: true }
//     receive next card + choices in response
//
// hmm...
// - how do we know when we're done with the deck?
//
const StudyPage = () => {
  const { query } = useRouter()
  const { data, error } = useSWR(
    () => query.deckid && `/api/decks/${query.deckid}`,
    fetcher
  )

  if (error) return <div>api call failed</div>

  if (!data) return <Skeleton />

  const { deck, topic, subTopic } = data

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
        <header className="mt-10 mb-6">
          <Breadcrumbs crumbs={crumbs} />
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 ">
            {deck.name}
          </h1>
          <p className="mb-4 text-xl font-normal tracking-tight text-gray-500">
            {deck.description}
          </p>
          <div className="flex items-center">
            <Image
              src="/me.jpg"
              alt="a pic of me"
              width={50}
              height={50}
              className="rounded-full"
            />
            <p className="ml-3 font-semibold">David Valles</p>
          </div>
        </header>
        {/*
        <div>
          <div className="p-6 mb-8 shadow-sm ring-1 ring-black ring-opacity-5 rounded-xl">
            <p className="text-xs text-gray-500 uppercase">term</p>
            <div className="flex justify-center py-10">
              <p>Algebraic Expression</p>
            </div>
          </div>
          <ul className="space-y-4">
            <li className="px-4 py-4 shadow-sm ring-1 ring-blue-500 rounded-xl">
              Loreum ipsum orem ipsum dolor sit amet.
            </li>
            <li className="px-4 py-4 shadow-sm ring-1 ring-blue-500 rounded-xl">
              Loreum ipsum orem ipsum dolor sit amet.
            </li>
            <li className="px-4 py-4 shadow-sm ring-1 ring-blue-500 rounded-xl">
              Loreum ipsum orem ipsum dolor sit amet.
            </li>
            <li className="px-4 py-4 shadow-sm ring-1 ring-blue-500 rounded-xl">
              Loreum ipsum orem ipsum dolor sit amet.
            </li>
          </ul>
        </div>
        */}
      </main>
      <footer></footer>
    </div>
  )
}

export default StudyPage

const Skeleton = () => {
  return (
    <div className="max-w-3xl px-4 mx-auto antialiased sm:px-8 md:px-12 lg:px-0">
      <Nav />
      <main className="animate-pulse">
        <header className="mt-10 mb-6">
          <div className="w-3/4 h-4 mb-4 bg-gray-300 rounded"></div>
          <div className="w-1/2 mb-5 bg-gray-300 rounded h-9"></div>
          <div className="mb-4 space-y-2">
            <div className="w-full h-4 bg-gray-300 rounded"></div>
            <div className="w-full h-4 bg-gray-300 rounded"></div>
          </div>
          <div className="flex items-center">
            <div className="bg-gray-300 rounded-full w-14 h-14"></div>
            <div className="w-1/4 h-6 ml-3 bg-gray-300 rounded"></div>
          </div>
        </header>
      </main>
    </div>
  )
}
