//import { useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Image from 'next/image'
//import arrayShuffle from 'array-shuffle'

import { Nav } from '@/components/Nav'
import { Section } from '@/components/Section'
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

// returns an integer between minimum(inclusive) and maximum(exclusive).
const getRandomInt = (minimum, maximum) => {
  const min = Math.ceil(minimum)
  const max = Math.floor(maximum)
  return Math.floor(Math.random() * (max - min) + min)
}

const takeRandomItem = (arr = []) => (count = 1) => {
  const limit = count > arr.length ? arr.length : count
  const list = arr.slice()
  let result = []

  for (let i = 0; i < limit; i += 1) {
    const randomIdx = getRandomInt(0, list.length)
    result.push(list[randomIdx])
    list.splice(randomIdx, 1)
  }

  return result
}

// TODO:
// - to be the brains of pulling the next card.
const getNextCard = (cards = [], currentCard) => {
  if (!cards.length) {
    return undefined
  }

  return !currentCard
    ? takeRandomItem(cards)().pop()
    : takeRandomItem(cards.filter((c) => c.id !== currentCard.id))().pop()
}

const generateAnswerChoices = (currentCard, cards = [], options = {}) => {
  const field = options?.field || 'definition'

  return !currentCard
    ? []
    : [
        currentCard,
        ...takeRandomItem(cards.filter((card) => card.id !== currentCard.id))(
          3
        ),
      ].map((card) => ({
        id: card.id,
        text: card[field],
        isCorrectChoice: card.id === currentCard.id,
      }))
}

const StudyPage = () => {
  const { query } = useRouter()
  const { data } = useSWR(
    () => query.deckid && `/api/decks/${query.deckid}`,
    fetcher
  )
  const isLoading = !data
  const { deck, topic, subTopic } = data || {}
  const crumbs =
    deck && topic && subTopic
      ? [
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
      : []

  const card = getNextCard(deck?.cards)
  const cardAnswerChoices = generateAnswerChoices(card, deck?.cards)

  if (isLoading) return <Skeleton />

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
        <Section>
          <div className="mb-8 space-y-6">
            <div className="p-4 ring-1 ring-gray-300 rounded-xl">
              <span className="text-xs text-gray-500 uppercase">term</span>
              <div className="flex justify-center py-14">
                <p>{card.term}</p>
              </div>
            </div>
            <ul className="space-y-4">
              {cardAnswerChoices.map((choice) => (
                <li
                  key={choice.id}
                  className="px-4 py-4 shadow-sm ring-1 ring-blue-500 rounded-xl"
                >
                  {choice.text}
                </li>
              ))}
            </ul>
          </div>
        </Section>
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
