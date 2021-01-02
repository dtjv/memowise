//import Image from 'next/image'
import Link from 'next/link'
import pluralize from 'pluralize'

export const Decks = ({ decks }) => {
  const renderDecks = decks.map((deck) => (
    <li key={deck.id} className="p-6 bg-gray-800 shadow-lg rounded-3xl">
      <Link href={`/decks/${deck.id}`}>
        <a>
          <div>
            <h2 className="text-2xl font-semibold">{deck.name}</h2>
            <p className="mb-4 text-sm font-medium text-gray-400 uppercase">
              {pluralize('term', deck.cards.length, true)}
            </p>
            <p className="font-medium">{deck.description}</p>
            {/*
          <div className="flex items-center">
            <Image
              src="/me.jpg"
              alt="a pic of me"
              width={50}
              height={50}
              className="rounded-full"
            />
            <p className="ml-3 font-semibold">David Valles</p>
          </div>
          */}
          </div>
        </a>
      </Link>
    </li>
  ))

  return <ul className="text-white space-y-8">{renderDecks}</ul>
}
