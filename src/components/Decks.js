import Link from 'next/link'
import { useRouter } from 'next/router'
import pluralize from 'pluralize'
import axios from 'axios'

import { TrashCanIcon } from './icons/trash-can'
import { PencilIcon } from './icons/pencil'

const Deck = ({ deck, editable }) => {
  const router = useRouter()
  const handleDelete = async () => {
    await axios.delete(`/api/decks/${deck.id}`)
    router.reload()
  }

  return (
    <li className="border rounded-lg shadow">
      <div className="p-4">
        <h3 className="text-2xl font-semibold">{deck.name}</h3>
        <p className="mb-4 text-sm font-medium text-gray-400 uppercase">
          {pluralize('term', deck.cards.length, true)}
        </p>
        <p className="">{deck.description}</p>
      </div>
      <div className="flex justify-between p-4 bg-gray-100 rounded-b-lg">
        <Link href={`/decks/${deck.id}`}>
          <a className="inline-flex items-center justify-center rounded-md px-3 py-1.5 font-semibold text-white bg-gray-800 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
            Study
          </a>
        </Link>
        {editable && (
          <div className="flex items-center space-x-2">
            <Link href={`/decks/${deck.id}/edit`}>
              <a>
                <PencilIcon className="w-6 h-6" />
              </a>
            </Link>
            <button onClick={handleDelete}>
              <TrashCanIcon className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </li>
  )
}

export const Decks = ({ decks, editable = false }) => {
  const renderDecks = decks.map((deck) => (
    <Deck key={deck.id} deck={deck} editable={editable} />
  ))

  return <ul className="space-y-8">{renderDecks}</ul>
}
