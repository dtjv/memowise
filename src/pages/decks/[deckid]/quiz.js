import { useRef, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import useSWR from 'swr'
import pickRandom from 'pick-random'
import arrayShuffle from 'array-shuffle'

import { Container } from '@/components/Container'
import { BreadCrumbs } from '@/components/BreadCrumbs'
import { useQuiz } from '@/hooks/useQuiz'
import { fetcher } from '@/utils/fetcher'

const generateChoices = (currentCard, cards = [], options = {}) => {
  const field = options?.field || 'definition'

  return !currentCard
    ? []
    : [
        currentCard,
        ...pickRandom(
          cards.filter((card) => card.id !== currentCard.id),
          { count: 2 }
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
  const {
    getNextCard,
    resetQuiz,
    getScore,
    markCorrect,
    markIncorrect,
    isQuizComplete,
  } = useQuiz(deck?.cards)

  useEffect(() => {
    setCard(getNextCard())
  }, [deck, getNextCard])

  useEffect(() => {
    setChoices(arrayShuffle(generateChoices(card, deck?.cards)))
    setSelectedChoice(undefined)
  }, [card, deck])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (selectedChoice) {
        if (selectedChoice.isCorrectChoice) {
          markCorrect()
        } else {
          markIncorrect()
        }
        setCard(getNextCard())
      }
    }, 1000)

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [selectedChoice, getNextCard, markCorrect, markIncorrect])

  if (isLoading) return <Skeleton />

  return (
    <>
      <Head>
        <title>Memowise - {deck.name}</title>
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
      {isQuizComplete() ? (
        <Container>
          <div className="mb-8 space-y-8">
            <div className="p-4 ring-1 ring-gray-500 rounded-xl">
              <div className="flex flex-col items-center py-14 space-y-4">
                <h3 className="text-2xl font-bold leading-tight text-gray-800">
                  Quiz Complete!
                </h3>
                <div className="flex flex-col items-center space-y-1">
                  <p className="text-lg font-semibold text-green-500">
                    Correct
                  </p>
                  <p className="text-lg font-bold">{getScore().numCorrect}</p>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <p className="text-lg font-semibold text-red-500">
                    Incorrect
                  </p>
                  <p className="text-lg font-bold">{getScore().numIncorrect}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div
                className="cursor-pointer inline-flex items-center justify-center rounded-md px-3 py-1.5 font-semibold text-white bg-gray-800 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                onClick={() => {
                  resetQuiz()
                  setCard(getNextCard())
                }}
              >
                Start Over
              </div>
            </div>
          </div>
        </Container>
      ) : (
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
      )}
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
