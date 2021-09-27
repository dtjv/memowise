import Link from 'next/link'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import pluralize from 'pluralize'
import axios from 'axios'

import { useUser } from '@/hooks/useUser'
import { TrashCanIcon } from './icons/trash-can'
import { PencilIcon } from './icons/pencil'
import { PlusIcon } from './icons/plus'
import { DocRemoveIcon } from './icons/doc-remove'

export const Deck = ({ deck, ...props }) => {
  const [session] = useSession()
  const { user } = useUser(session)
  const router = useRouter()
  const handleDelete = async () => {
    await axios.delete(`/api/decks/${deck.id}`)
    router.reload()
  }
  const handleLink = async () => {
    await axios.post(`/api/decks/${deck.id}/link`)
    router.reload()
  }
  const handleUnLink = async () => {
    await axios.post(`/api/decks/${deck.id}/unlink`)
    router.reload()
  }

  return (
    <li className="border rounded-lg shadow">
      <div className="p-4">
        <h3 className="text-2xl font-semibold leading-tight text-gray-800">
          {deck.name}
        </h3>
        <p className="mb-4 text-sm font-medium text-gray-400 uppercase">
          {pluralize('term', deck.cards.length, true)}
        </p>
        <p className="">{deck.description}</p>
      </div>
      <div className="flex justify-between p-4 bg-gray-100 rounded-b-lg">
        <Link href={`/decks/${deck.id}${user ? '/study' : ''}`}>
          <a className="inline-flex items-center justify-center rounded-md px-3 py-1.5 font-semibold text-white bg-gray-800 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
            {user ? 'Study' : 'Explore'}
          </a>
        </Link>
        {props.created && (
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
        {props.linked && (
          <button onClick={handleUnLink}>
            <DocRemoveIcon className="w-6 h-6" />
          </button>
        )}
        {props.unlinked && (
          <button onClick={handleLink}>
            <PlusIcon className="w-6 h-6" />
          </button>
        )}
      </div>
    </li>
  )
}
