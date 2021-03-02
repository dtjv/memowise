import { Container } from './Container'
import { Deck } from './Deck'

export const Decks = ({ decks = [], user }) => {
  const createdDeckList = decks.filter((deck) =>
    (user?.decks?.created ?? []).find((created) => created.id === deck.id)
  )
  const linkedDeckList = decks.filter((deck) =>
    (user?.decks?.linked ?? []).find((linked) => linked.id === deck.id)
  )
  const unlinkedDeckList = decks.filter(
    (deck) =>
      !linkedDeckList.find((linked) => linked.id === deck.id) &&
      !createdDeckList.find((created) => created.id === deck.id)
  )
  const renderCreatedDecks = createdDeckList.map((deck) => (
    <Deck key={deck.id} deck={deck} created />
  ))
  const renderLinkedDecks = linkedDeckList.map((deck) => (
    <Deck key={deck.id} deck={deck} linked />
  ))
  const renderUnlinkedDecks = unlinkedDeckList.map((deck) => (
    <Deck key={deck.id} deck={deck} unlinked />
  ))
  const renderAllDecks = decks.map((deck) => <Deck key={deck.id} deck={deck} />)

  if (user) {
    return (
      <>
        {renderCreatedDecks.length ? (
          <Container>
            <h2 className="mb-6 text-2xl font-bold leading-tight text-gray-900">
              Created by you
            </h2>
            <ul className="space-y-8">{renderCreatedDecks}</ul>
          </Container>
        ) : null}
        {renderLinkedDecks.length || renderUnlinkedDecks.length ? (
          <Container>
            <h2 className="mb-6 text-2xl font-bold leading-tight text-gray-900">
              Community sets
            </h2>
            <ul className="space-y-8">
              {renderLinkedDecks}
              {renderUnlinkedDecks}
            </ul>
          </Container>
        ) : null}
      </>
    )
  }

  return (
    <Container>
      <h2 className="mb-6 text-2xl font-bold leading-tight text-gray-900">
        Community sets
      </h2>
      <ul className="space-y-8">{renderAllDecks}</ul>
    </Container>
  )
}
