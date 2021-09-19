import { getRandomInt } from './getRandomInt'

export const takeRandomItem =
  (arr = []) =>
  (count = 1) => {
    const limit = count > arr.length ? arr.length : count
    const list = arr.slice()
    let result = []

    for (let i = 0; i < limit; i += 1) {
      const randomIdx = getRandomInt(0, list.length)
      result.push(list[randomIdx])
      list.splice(randomIdx, 1)
    }

    return result
  }
