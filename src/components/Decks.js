import { Deck } from './Deck'

export const Decks = ({ decks = [], ...props }) => {
  if (!decks.length) return null

  return (
    <ul className="space-y-8">
      {decks.map((deck) => (
        <Deck key={deck.id} deck={deck} {...props} />
      ))}
    </ul>
  )
}
