import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import useSWR from 'swr'
import arrayShuffle from 'array-shuffle'

import { Container } from '@/components/Container'
import { BreadCrumbs } from '@/components/BreadCrumbs'
import { fetcher } from '@/utils/fetcher'
import { takeRandomItem } from '@/utils/takeRandomItem'

const getNextCard = (cards = [], currentCardId) => {
  if (!cards.length) {
    return undefined
  }

  return currentCardId === undefined
    ? takeRandomItem(cards)().pop()
    : takeRandomItem(cards.filter((card) => card.id !== currentCardId))().pop()
}

const generateChoices = (currentCard, cards = [], options = {}) => {
  const field = options?.field || 'definition'

  return !currentCard
    ? []
    : [
        currentCard,
        ...takeRandomItem(cards.filter((card) => card.id !== currentCard.id))(
          2
        ),
      ].map((card) => ({
        id: card.id,
        text: card[field],
        isCorrectChoice: card.id === currentCard.id,
      }))
}

const QuizPage = () => {
  const [selectedChoice, setSelectedChoice] = useState(undefined)
  const [card, setCard] = useState(undefined)
  const [choices, setChoices] = useState([])
  const { query } = useRouter()
  const { data } = useSWR(
    () => query.deckid && `/api/decks/${query.deckid}`,
    fetcher
  )
  const isLoading = !data
  const { deck } = data || {}
  const topic = deck?.topic
  const subTopic = deck?.subTopic
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
  const cardRef = useRef(card)
  cardRef.current = card

  useEffect(() => {
    setCard(getNextCard(deck?.cards))
  }, [deck])

  useEffect(() => {
    setChoices(arrayShuffle(generateChoices(cardRef.current, deck?.cards)))
    setSelectedChoice(undefined)
  }, [card, deck])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (selectedChoice) {
        setCard(getNextCard(deck?.cards, cardRef.current.id))
      }
    }, 1000)

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [selectedChoice])

  if (isLoading) return <Skeleton />

  return (
    <>
      <Head>
        <title>MemoWise - {deck.name}</title>
      </Head>
      <Container>
        <BreadCrumbs crumbs={crumbs} />
        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900">
          {deck.name}
        </h1>
        <p className="mb-4 text-xl font-normal tracking-tight text-gray-500">
          {deck.description}
        </p>
      </Container>
      <Container>
        <div className="mb-8 space-y-6">
          <div className="p-4 ring-1 ring-black rounded-xl">
            <span className="text-xs text-gray-500 uppercase">term</span>
            <div className="flex justify-center mb-4 py-14">
              <p>{card?.term}</p>
            </div>
          </div>
          <ul className="space-y-4">
            {choices.map((choice, idx) => {
              const isRightAnswer =
                selectedChoice?.isCorrectChoice &&
                selectedChoice?.id === choice.id
              const isWrongAnswer =
                !selectedChoice?.isCorrectChoice &&
                selectedChoice?.id === choice.id
              const ring = isRightAnswer
                ? 'ring-2 ring-green-500'
                : isWrongAnswer
                ? 'ring-2 ring-red-500'
                : 'ring-1 ring-gray-300'

              return (
                <li
                  key={choice.id}
                  className={`flex items-center justify-between px-4 py-4 shadow-sm ${ring} rounded-xl hover:shadow-lg cursor-pointer`}
                  onClick={() => setSelectedChoice(choice)}
                >
                  <span>
                    <span className="mr-3 font-semibold">
                      {`${String.fromCharCode('A'.charCodeAt() + idx)}`}
                    </span>
                    {choice.text}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </>
  )
}

export default QuizPage

const Skeleton = () => {
  return (
    <>
      <div className="animate-pulse">
        <Container>
          <div className="w-3/4 h-4 mb-4 bg-gray-300 rounded"></div>
          <div className="w-1/2 h-10 mb-5 bg-gray-300 rounded"></div>
          <div className="mb-4 space-y-2">
            <div className="w-full h-6 bg-gray-300 rounded"></div>
            <div className="w-2/3 h-6 bg-gray-300 rounded"></div>
          </div>
          {/*
          <div className="flex items-center">
            <div className="bg-gray-300 rounded-full w-14 h-14"></div>
            <div className="w-1/4 h-6 ml-3 bg-gray-300 rounded"></div>
          </div>
          */}
        </Container>
        <Container>
          <div className="space-y-6">
            <div className="w-full bg-gray-300 h-52 rounded-xl"></div>
            <div className="space-y-4">
              <div className="w-full h-12 bg-gray-300 rounded-xl"></div>
              <div className="w-full h-12 bg-gray-300 rounded-xl"></div>
              <div className="w-full h-12 bg-gray-300 rounded-xl"></div>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}
