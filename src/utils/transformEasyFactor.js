export const transformEasyFactor = (_, o) => {
  if (o?.decks?.studied) {
    for (const sd of o.decks.studied) {
      sd.cards = sd.cards.map((card) => ({
        ...card,
        easyFactor: parseFloat(card.easyFactor),
      }))
    }
  }

  return o
}
