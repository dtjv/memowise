// returns an integer between minimum(inclusive) and maximum(exclusive).
export const getRandomInt = (minimum, maximum) => {
  const min = Math.ceil(minimum)
  const max = Math.floor(maximum)
  return Math.floor(Math.random() * (max - min) + min)
}
