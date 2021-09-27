import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

import { Container } from '@/components/Container'
import { Cards } from '@/components/Cards'
import { BreadCrumbs } from '@/components/BreadCrumbs'
import { StudyCard } from '@/components/StudyCard'
import { NotAuthorized } from '@/components/NotAuthorized'
import { useUser } from '@/hooks/useUser'
import { useStudy } from '@/hooks/useStudy'
import { fetcher } from '@/utils/fetcher'
import { isEmpty } from '@/utils/isEmpty'

const StudyPage = () => {
  const [session] = useSession()
  const { user } = useUser(session)
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
          {
            name: topic.name,
            path: `/browse/${topic.slug}`,
            isLink: true,
          },
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
  const [card, setCard] = useState(undefined)
  const [selectedGrade, setSelectedGrade] = useState({})
  const { getNextCard, resetStudy, recordGrade } = useStudy(user, deck)

  useEffect(() => {
    setCard(getNextCard())
  }, [getNextCard])

  useEffect(() => {
    setSelectedGrade({})
  }, [card])

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!isEmpty(selectedGrade)) {
        await recordGrade(card, selectedGrade.grade)
        setCard(getNextCard())
      }
    }, 1000)

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [card, selectedGrade, getNextCard, recordGrade])

  if (!session) {
    return <NotAuthorized />
  }

  if (isLoading) {
    return <Skeleton />
  }

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
      <Container>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Study</h2>
        {!card && (
          <>
            <p className="mb-6 text-xl font-normal tracking-tight text-gray-500">
              Congratulations! You completed all cards in this deck for today.
            </p>
            <div className="p-4 ring-1 ring-gray-500 rounded-xl">
              <div className="flex justify-center py-20">
                <div
                  className="cursor-pointer inline-flex items-center justify-center rounded-md px-3 py-1.5 font-semibold text-white bg-gray-800 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                  onClick={() => {
                    resetStudy()
                    setCard(getNextCard())
                  }}
                >
                  Study Again
                </div>
              </div>
            </div>
          </>
        )}
        {card && (
          <>
            <p className="mb-6 text-xl font-normal tracking-tight text-gray-500">
              Tap the card to see the definition. Then, rate your memory recall
              by marking one of six choices below.
            </p>
            <StudyCard
              card={card}
              selectedGrade={selectedGrade}
              onGradeSelected={setSelectedGrade}
            />
          </>
        )}
      </Container>
      <Container>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 ">Flashcards</h2>
          <Link href={`/decks/${deck.id}/quiz`}>
            <a className="inline-flex items-center px-3 py-1.5 font-semibold text-white bg-gray-900 text-md rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-gray-700">
              Take Quiz
            </a>
          </Link>
        </div>
        <Cards cards={deck.cards} />
      </Container>
    </>
  )
}

export default StudyPage

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
