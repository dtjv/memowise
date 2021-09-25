import { useRef, useMemo } from 'react'
import { isAfter } from 'date-fns'
import getRange from 'get-range'
import randomInteger from 'random-int'
import arrayDiffer from 'array-differ'
import { SuperMemoItemDefaults } from '@dtjv/sm-2'
import uniqueArrayBy from '@dtjv/uniq-array-by'
import { useRandomizeArray } from '@/hooks/useRandomizeArray'

// TODO: remove
const wait = (ms) => new Promise((success) => setTimeout(success, ms))

const initializeCardsToStudy = (user, deck) => {
  if (!user || !deck) return []

  const today = new Date()
  const defaultCards = deck.cards.map((card) => ({
    ...card,
    ...SuperMemoItemDefaults,
    lastStudyDate: today,
    lastStudyGrade: 0,
  }))
  const studiedCards =
    user.decks?.studied?.find((studiedDeck) => studiedDeck.id === deck.id) ?? []

  return uniqueArrayBy(
    [
      ...defaultCards,
      ...studiedCards.filter((card) => isAfter(today, card.lastStudyDate)),
      ...studiedCards.filter((card) => card.lastStudyGrade < 4),
    ],
    'id'
  )
}

export const useStudy = (user, deck) => {
  const cardsRef = useRef([])
  cardsRef.current = initializeCardsToStudy(user, deck)

  const { getNextItem, reset } = useRandomizeArray(cardsRef.current)
  const resetStudy = async () => {
    reset()
    // TODO: fetch user data so we can get updated cards
    console.log('reset study...')
  }
  const recordGrade = async (card, grade) => {
    // TODO: api call to update user.studied
    console.log('recording...')
    console.log('-> grade:', grade)
    console.log('-> card :', card?.term)
    await wait(500)
  }

  return {
    getNextCard: useMemo(() => getNextItem, [deck]),
    resetStudy,
    recordGrade,
  }
}
