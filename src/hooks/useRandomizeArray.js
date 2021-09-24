export const useRandomizeArray = (items = []) => {
  const usedIndices = useRef(new Map())

  const getNextItem = () => {
    const allIndices = [...getRange({ end: items.length })]
    const indices =
      usedIndices.current.size === 0
        ? allIndices
        : arrayDiffer(allIndices, [...usedIndices.current.keys()])

    if (indices.length) {
      const randomIdx = randomInteger(indices.length - 1)
      const itemIdx = indices[randomIdx]

      usedIndices.current.set(itemIdx, true)

      return items[itemsIdx]
    }

    return undefined
  }

  const reset = () => {
    usedIndices.current.clear()
  }

  const isDone = () => usedIndices.current.size === items.length

  return {
    getNextItem,
    reset,
    isDone,
  }
}
