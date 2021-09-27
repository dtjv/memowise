import { useState } from 'react'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import { Container } from '@/components/Container'
import { TrashCanIcon } from '@/components/icons/trash-can'

const createEmptyCard = () => ({ __uid: uuid(), term: '', definition: '' })

const CardsForm = ({ cards, onChange, onDelete }) => {
  if (!cards.length) return null

  return (
    <ul className="space-y-6">
      {cards.map((card) => (
        <li key={card.__uid} className="p-4 border rounded-lg shadow space-y-4">
          <label className="block">
            <span className="text-gray-600">Term</span>
            <input
              type="text"
              value={card.term}
              onChange={(e) => onChange(card.__uid, 'term', e.target.value)}
              placeholder="Add term"
              className="block w-full mt-1 text-gray-800 bg-gray-100 border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0"
            />
          </label>
          <label className="block">
            <span className="text-gray-600">Definition</span>
            <textarea
              value={card.definition}
              onChange={(e) =>
                onChange(card.__uid, 'definition', e.target.value)
              }
              placeholder="Add definition"
              className="block w-full mt-1 text-gray-800 bg-gray-100 border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0"
              rows="3"
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
  const [cards, setCards] = useState(
    deck.cards ?? [createEmptyCard(), createEmptyCard()]
  )

  const handleChangeCard = (cardId, field, newValue) => {
    setCards((cardList) =>
      cardList.map((card) =>
        card.__uid === cardId ? { ...card, [field]: newValue } : card
      )
    )
  }

  const handleAddCard = () => {
    setCards((cardList) => [...cardList, createEmptyCard()])
  }

  const handleDeleteCard = (cardId) => {
    setCards((cardList) => cardList.filter((card) => card.__uid !== cardId))
  }

  return (
    <>
      <div className="space-y-4">
        <label className="block">
          <span className="text-gray-600">Set Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Add a name (i.e. Math 101)"
            className="block w-full mt-1 text-gray-800 bg-gray-100 border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0"
          />
        </label>
        <label className="block">
          <span className="text-gray-600"> Set Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description"
            className="block w-full mt-1 text-gray-800 bg-gray-100 border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0"
            rows="3"
          ></textarea>
        </label>
      </div>

      <Container>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 ">Cards</h2>
        <CardsForm
          cards={cards}
          onChange={handleChangeCard}
          onDelete={handleDeleteCard}
        />
      </Container>

      <div className="flex justify-center">
        <button
          onClick={handleAddCard}
          className="inline-flex items-center px-3 py-1.5 text-base font-semibold text-gray-900 bg-white rounded-md border border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
          aria-label="add card"
        >
          Add Card
        </button>
      </div>

      <Container>
        <div className="flex justify-center">
          <button
            className="inline-flex flex-none items-center px-3 py-1.5 text-base font-semibold text-white bg-blue-700 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800"
            aria-label="update deck"
            onClick={() => onSubmit({ name, description, cards })}
          >
            {submitLabel}
          </button>
          <button
            className="ml-2 inline-flex items-center px-3 py-1.5 text-base font-semibold text-red-500 rounded-md border border-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            aria-label="cancel button"
            onClick={() => router.push('/dashboard')}
          >
            Cancel
          </button>
        </div>
      </Container>
    </>
  )
}
