import { useRef, useMemo } from 'react'
import { range, random, difference } from 'lodash'

export const useQuiz = (cards = []) => {
  const usedIndexHash = useRef({})
  const numCorrect = useRef(0)
  const numIncorrect = useRef(0)

  const getNextCard = () => {
    const allIndices = range(cards.length)
    const usedIndices = Object.keys(usedIndexHash.current).map((v) =>
      parseInt(v, 10)
    )
    const indices = !usedIndices.length
      ? allIndices
      : difference(allIndices, usedIndices)

    if (indices.length) {
      const randomIdx = random(indices.length - 1)
      const cardsIdx = indices[randomIdx]

      usedIndexHash.current[cardsIdx] = true

      return cards[cardsIdx]
    }

    return undefined
  }
  const resetQuiz = () => {
    numCorrect.current = 0
    numIncorrect.current = 0
    usedIndexHash.current = {}
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
