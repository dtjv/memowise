import { useRef, useMemo } from 'react'

import getRange from 'get-range'
import randomInteger from 'random-int'
import arrayDiffer from 'array-differ'

export const useQuiz = (cards = []) => {
  const usedIndices = useRef([])
  const numCorrect = useRef(0)
  const numIncorrect = useRef(0)
  const getNextCard = () => {
    const allIndices = [...getRange({ end: cards.length })]
    const indices = !usedIndices.length
      ? allIndices
      : arrayDiffer(allIndices, usedIndices)

    if (indices.length) {
      const randomIdx = randomInteger(indices.length - 1)
      const cardsIdx = indices[randomIdx]

      usedIndices.current[cardsIdx] = true

      return cards[cardsIdx]
    }

    return undefined
  }
  const resetQuiz = () => {
    numCorrect.current = 0
    numIncorrect.current = 0
    usedIndices.current = []
  }
  const markCorrect = () => (numCorrect.current += 1)
  const markIncorrect = () => (numIncorrect.current += 1)
  const isQuizComplete = () =>
    cards.length
      ? numCorrect.current + numIncorrect.current === cards.length
      : false
  const getScore = () => ({
    numCorrect: numCorrect.current,
    numIncorrect: numIncorrect.current,
  })

  return {
    getNextCard: useMemo(() => getNextCard, [cards]),
    resetQuiz,
    getScore,
    markCorrect: useMemo(() => markCorrect, []),
    markIncorrect: useMemo(() => markIncorrect, []),
    isQuizComplete: useMemo(() => isQuizComplete, [cards]),
  }
}
