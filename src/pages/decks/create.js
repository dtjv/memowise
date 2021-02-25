import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { v4 as uuid } from 'uuid'
import axios from 'axios'

import { Container } from '@/components/Container'

//import { dump } from '@/utils/debug'

const createEmptyCard = () => ({ __uid: uuid(), term: '', definition: '' })

const NewCard = ({ card, onChange, onDelete }) => (
  <li>
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
        onChange={(e) => onChange(card.__uid, 'definition', e.target.value)}
        placeholder="Add definition"
        className="block w-full"
        rows="1"
      ></textarea>
    </label>
    <button
      onClick={() => onDelete(card.__uid)}
      className="inline-flex items-center px-3 py-1.5 text-base font-semibold text-white bg-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
      aria-label="add card"
    >
      Delete Card
    </button>
  </li>
)

const CreateDeckPage = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [cards, setCards] = useState([])
  const [session, loading] = useSession()

  // TODO: improve
  if (!session) {
    return <div>Please Sign In</div>
  }

  // TODO: improve
  if (loading) {
    return <div>Loading...</div>
  }

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

  const handleCreateDeck = async () => {
    const newDeck = { name, description, cards }
    await axios.post(`/api/decks`, { newDeck })
    router.push('/dashboard')
  }

  return (
    <>
      <Head>
        <title>MemoWise - Create New Flashcard Set</title>
      </Head>
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

        <ul>
          {cards.map((card) => (
            <NewCard
              key={card.__uid}
              card={card}
              onChange={handleChangeCard}
              onDelete={handleDeleteCard}
            />
          ))}
        </ul>

        <button
          className="inline-flex items-center px-3 py-1.5 text-base font-semibold text-white bg-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          aria-label="add card"
          onClick={handleCreateDeck}
        >
          Create
        </button>
      </Container>
      <Container></Container>
    </>
  )
}

export default CreateDeckPage
