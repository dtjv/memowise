import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import { v4 as uuid } from 'uuid'
import axios from 'axios'

import { Layout } from '@/components/Layout'
import { Container } from '@/components/Container'

import { getDeck } from '@/lib/data'

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

const EditDeckPage = ({ deck }) => {
  const router = useRouter()
  const [name, setName] = useState(deck.name)
  const [description, setDescription] = useState(deck.description)
  const [cards, setCards] = useState(deck.cards)
  // TODO: add `isSubmitting` state

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

  const handleEditDeck = async () => {
    const updatedDeck = { name, description, cards }

    await axios.patch(`/api/decks/${deck.id}`, { updatedDeck })

    router.push('/dashboard')
  }

  return (
    <Layout>
      <Head>
        <title>MemoWise - Edit a Flashcard Set</title>
      </Head>
      <Container>
        <p>Edit a flashcard set</p>
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
          onClick={handleEditDeck}
        >
          Update
        </button>
      </Container>
      <Container></Container>
    </Layout>
  )
}

export default EditDeckPage

export async function getServerSideProps({ req, res, params }) {
  const session = await getSession({ req })

  if (!session) {
    res.writeHead(302, {
      Location: '/',
    })
    res.end()
    return { props: {} }
  }

  const deck = await getDeck({ id: params.deckid })
  delete deck.topic
  delete deck.subTopic

  return {
    props: {
      deck,
    },
  }
}
