import { useState } from 'react'
import getRange from 'get-range'
import randomInteger from 'random-int'
import arrayDiffer from 'array-differ'
import uniqueArrayBy from '@dtjv/uniq-array-by'
import { useRandomizeArray } from '@/hooks/useRandomizeArray'

export const useStudy = (user, deck) => {
  // TODO
  // cards to study...
  //   a. on user: today's date >= card's last studied date + card's repInterval
  //   b. on user: cards with grade < 4
  //   c. on deck: card on deck that are not on user (i.e.: not studied)
  //
  // user = {
  //   decks: {
  //     created: [
  //       deckId,
  //       deckId,
  //       ...
  //     ],
  //     linked: [
  //       deckId,
  //       deckId,
  //       ...
  //     ],
  //     studied: [
  //       {
  //         deckId,
  //         cards: [
  //           {
  //             ...card fields,
  //             ...sm-2 fields,
  //             ...lastStudyDate,
  //             ...lastGrade
  //           },
  //           ...
  //         ]
  //       },
  //       ...
  //     ]
  //   }
  // }
  const initializeCards = (user, deck) => {
    if (!user || !deck) return []

    const today = new Date()

    // TODO: get defaults from sm2 lib
    const defaultCards = deck.cards.map((card) => ({
      ...card,
      rep: 0,
      repInterval: 1,
      easyFactor: 2.5,
      lastStudyDate: today,
      lastStudyGrade: 0,
    }))
    const studiedCards =
      user.decks?.studied?.find((studiedDeck) => studiedDeck.id === deck.id) ??
      []

    return uniqueArrayBy(
      [
        ...defaultCards,
        ...studiedCards.filter((card) => isAfter(today, card.lastStudyDate)),
        ...studiedCards.filter((card) => card.lastGrade < 4),
      ],
      'id'
    )
  }
  const cardsRef = useRef(initializeCards(user, deck))
  const { getNextItem, reset, isDone } = useRandomizeArray(cardsRef.current)
  const resetStudy = async () => {
    reset()
    // TODO: fetch user data so we can get updated cards
    console.log('fetch user data again...')
  }
  const recordGrade = async (card, grade) => {
    // TODO: api call to update user
    console.log('record grade:', grade)
  }

  return {
    getNextCard: getNextItem,
    resetStudy,
    recordGrade,
    isStudyComplete: isDone,
  }
}
