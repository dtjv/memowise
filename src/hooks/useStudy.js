import axios from 'axios'
import { useRef, useMemo, useState } from 'react'
import { useSWRConfig } from 'swr'
import { isAfter } from 'date-fns'
import getRange from 'get-range'
import randomInteger from 'random-int'
import arrayDiffer from 'array-differ'

import { sm2, SuperMemoItemDefaults } from '@dtjv/sm-2'
import uniqueArrayBy from '@dtjv/uniq-array-by'
import { useRandomizeArray } from '@/hooks/useRandomizeArray'

const initializeCardsToStudy = (user, deck) => {
  if (!user || !deck) return []

  const today = new Date()
  const defaultCards = deck.cards.map((card) => ({
    ...card,
    ...SuperMemoItemDefaults,
    lastStudyDate: today,
    lastStudyGrade: 0,
  }))

  const studiedDeck =
    user.decks?.studied?.find(({ deckId }) => deckId === deck.id) ?? {}

  // `initializeCardsToStudy` needs to return an array of sm2 cards (see
  // `defaultCards` above).  However...
  //   A. Studied cards only have `cardId`, no card fields.
  //   B. Studied cards may be out of sync with deck's cards.
  //
  // The steps to verify studied cards and get them in the correct format are:
  //   0. Find default card for each studied card
  //   1. Filter out studied cards w/o a default card
  //   2. Add default card fields to studied card
  const studiedCards = (
    studiedDeck.cards?.map((sc) => ({
      sc,
      dc: defaultCards.find((dc) => dc.id.toString() === sc.cardId.toString()),
    })) ?? []
  )
    .filter(({ dc }) => dc)
    .map(({ sc, dc }) => ({
      ...dc,
      ...sc, // Overwrites fields in common with default card
    }))

  return uniqueArrayBy(
    [
      ...defaultCards,
      ...studiedCards.filter((card) =>
        isAfter(today, new Date(card.lastStudyDate))
      ),
      ...studiedCards.filter((card) => card.lastStudyGrade < 4),
    ],
    'id'
  )
}

export const useStudy = (user, deck) => {
  const { mutate } = useSWRConfig()
  const cardsRef = useRef([])

  cardsRef.current = initializeCardsToStudy(user, deck)

  const { getNextItem, reset } = useRandomizeArray(cardsRef.current)
  const userApiKey = user ? `/api/users/${user.id}` : ''

  const resetStudy = () => {
    mutate(userApiKey)
    reset()
    cardsRef.current = []
  }

  const recordGrade = async (card, grade) => {
    const { id: cardId, rep, repInterval, easyFactor } = sm2(card, grade)

    await axios.patch(userApiKey, {
      deckId: deck.id,
      card: {
        cardId,
        rep,
        repInterval,
        easyFactor,
        lastStudyDate: new Date(),
        lastStudyGrade: grade,
      },
    })
  }

  return {
    getNextCard: useMemo(() => getNextItem, [deck]),
    resetStudy,
    recordGrade,
  }
}
