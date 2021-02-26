import { useState } from 'react'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import { Container } from '@/components/Container'
import { TrashCanIcon } from '@/components/icons/trash-can'

const createEmptyCard = () => ({ __uid: uuid(), term: '', definition: '' })

const CardsForm = ({ cards, onChange, onDelete }) => {
  return (
    <ul>
      {cards.map((card) => (
        <li key={card.__uid}>
          <label className="block">
            Term
            <input
              type="text"
              value={card.term}
              onChange={(e) => onChange(card.__uid, 'term', e.target.value)}
              placeholder="Add term"
              className="block w-full"
            />
          </label>
          <label className="block">
            Definition
            <textarea
              value={card.definition}
              onChange={(e) =>
                onChange(card.__uid, 'definition', e.target.value)
              }
              placeholder="Add definition"
              className="block w-full"
              rows="1"
            ></textarea>
          </label>
          <button onClick={() => onDelete(card.__uid)}>
            <TrashCanIcon className="w-6 h-6" />
          </button>
        </li>
      ))}
    </ul>
  )
}

export const DeckForm = ({ deck = {}, submitLabel, onSubmit }) => {
  const router = useRouter()
  const [name, setName] = useState(deck.name ?? '')
  const [description, setDescription] = useState(deck.description ?? '')
  const [cards, setCards] = useState(deck.cards ?? [])

  const handleChangeCard = (cardId, field, newValue) => {
    setCards((cardList) =>
      cardList.map((card) =>
        card.__uid === cardId ? { ...card, [field]: newValue } : card
      )
    )
  }

  const handleAddCard = () => {
    setCards((cardList) => [createEmptyCard(), ...cardList])
  }

  const handleDeleteCard = (cardId) => {
    setCards((cardList) => cardList.filter((card) => card.__uid !== cardId))
  }

  return (
    <Container>
      <p>Create a new flashcard deck</p>
      <label className="block">
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add a name (i.e. Math 101)"
          className="block w-full"
        />
      </label>
      <label className="block">
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description"
          className="block w-full"
          rows="3"
        ></textarea>
      </label>
      <button
        onClick={handleAddCard}
        className="inline-flex items-center px-3 py-1.5 text-base font-semibold text-white bg-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        aria-label="add card"
      >
        Add Card
      </button>

      <CardsForm
        cards={cards}
        onChange={handleChangeCard}
        onDelete={handleDeleteCard}
      />

      <button
        className="inline-flex items-center px-3 py-1.5 text-base font-semibold text-white bg-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        aria-label="update deck"
        onClick={() => onSubmit({ name, description, cards })}
      >
        {submitLabel}
      </button>
      <button
        className="inline-flex items-center px-3 py-1.5 text-base font-semibold text-red-500 rounded-md border border-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        aria-label="cancel button"
        onClick={() => router.back()}
      >
        Cancel
      </button>
    </Container>
  )
}
