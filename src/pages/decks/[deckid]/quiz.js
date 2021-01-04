import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import useSWR from 'swr'
import arrayShuffle from 'array-shuffle'

import { Layout } from '@/components/Layout'
import { Container } from '@/components/Container'
import { DeckHeader } from '@/components/DeckHeader'
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
  const cardRef = useRef(card)
  cardRef.current = card

  useEffect(() => {
    setCard(getNextCard(deck?.cards))
  }, [deck])

  useEffect(() => {
    setChoices(arrayShuffle(generateChoices(card, deck?.cards)))
  }, [card, deck])

  useEffect(() => {
    let timer

    if (selectedChoice) {
      timer = setTimeout(() => {
        if (selectedChoice) {
          setCard(getNextCard(deck?.cards, cardRef.current.id))
          setChoices(
            arrayShuffle(generateChoices(cardRef.current, deck?.cards))
          )
          setSelectedChoice(undefined)
        }
      }, 1000)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [selectedChoice])

  if (isLoading) return <Skeleton />

  return (
    <Layout>
      <Head>
        <title>MemoWise - {deck.name}</title>
      </Head>
      <Container>
        <BreadCrumbs crumbs={crumbs} />
        <DeckHeader deck={deck} />
      </Container>
      <Container>
        <div className="mb-8 space-y-6">
          <div className="p-4 ring-1 ring-gray-300 rounded-xl">
            <span className="text-xs text-gray-500 uppercase">term</span>
            <div className="flex justify-center py-14">
              <p>{card?.term}</p>
            </div>
          </div>
          <ul className="space-y-4">
            {choices.map((choice) => (
              <li
                key={choice.id}
                className="flex items-center justify-between px-4 py-4 shadow-sm ring-1 ring-blue-600 rounded-xl"
                onClick={() => setSelectedChoice(choice)}
              >
                <span>{choice.text}</span>
                {selectedChoice &&
                  selectedChoice?.isCorrectChoice &&
                  selectedChoice?.id === choice.id && (
                    <svg
                      className="w-6 h-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  )}
                {selectedChoice &&
                  !selectedChoice?.isCorrectChoice &&
                  selectedChoice.id === choice.id && (
                    <svg
                      className="w-6 h-6 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  )}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Layout>
  )
}

export default QuizPage

const Skeleton = () => {
  return (
    <Layout>
      <div className="animate-pulse">
        <Container>
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
        </Container>
      </div>
    </Layout>
  )
}
