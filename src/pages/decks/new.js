import { inspect } from 'util'
import { useState } from 'react'
import Head from 'next/head'
//import { useSession } from 'next-auth/client'
import { v4 as uuid } from 'uuid'

import { Layout } from '@/components/Layout'
import { Container } from '@/components/Container'

const createEmptyCard = () => ({ id: uuid(), term: '', definition: '' })

const NewCard = ({ card, onChange, onDelete }) => (
  <li>
    <label className="block">
      Term
      <input
        type="text"
        value={card.term}
        onChange={(e) => onChange(card.id, 'term', e.target.value)}
        placeholder="Add term"
        className="block w-full"
      />
    </label>
    <label className="block">
      Definition
      <textarea
        value={card.definition}
        onChange={(e) => onChange(card.id, 'definition', e.target.value)}
        placeholder="Add definition"
        className="block w-full"
        rows="1"
      ></textarea>
    </label>
    <button
      onClick={() => onDelete(card.id)}
      className="inline-flex items-center px-3 py-1.5 text-base font-semibold text-white bg-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
      aria-label="add card"
    >
      Delete Card
    </button>
  </li>
)

const NewDeckPage = () => {
  //const [title, setTitle] = useState('')
  const [cards, setCards] = useState([])

  console.log(inspect(cards, { depth: 4, colors: true }))

  /*
  const [session] = useSession()

  if (!session) {
    return <div>Please Sign In</div>
  }
  */
  const handleChangeCard = (cardId, field, newValue) => {
    setCards((cardList) =>
      cardList.map((card) =>
        card.id === cardId ? { ...card, [field]: newValue } : card
      )
    )
  }
  const handleAddCard = () => {
    setCards((cardList) => [createEmptyCard(), ...cardList])
  }

  const handleDeleteCard = (cardId) => {
    setCards((cardList) => cardList.filter((card) => card.id !== cardId))
  }

  return (
    <Layout>
      <Head>
        <title>MemoWise - Create New Flashcard Set</title>
      </Head>
      <Container>
        <p>Create a new flashcard deck</p>
        <label className="block">
          Title
          <input
            type="text"
            name="title"
            placeholder="Add a title (i.e. Math 101)"
            className="block w-full"
          />
        </label>
        <label className="block">
          Description
          <textarea
            name="description"
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

        <ul>
          {cards.map((card) => (
            <NewCard
              key={card.id}
              card={card}
              onChange={handleChangeCard}
              onDelete={handleDeleteCard}
            />
          ))}
        </ul>

        <button
          className="inline-flex items-center px-3 py-1.5 text-base font-semibold text-white bg-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          aria-label="add card"
        >
          Create
        </button>
      </Container>
      <Container></Container>
    </Layout>
  )
}

export default NewDeckPage
