//import Image from 'next/image'
import Link from 'next/link'
import pluralize from 'pluralize'

export const Decks = ({ decks }) => {
  // TODO: deck ids from dashbaord have _id - that'll break browse?
  const renderDecks = decks.map((deck) => (
    <li key={deck._id}>
      <Link href={`/decks/${deck._id}`}>
        <a
          className="block p-6 bg-gray-800 shadow-lg rounded-3xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-opacity-95"
          aria-label={`link to flashcard deck ${deck.name}`}
        >
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
