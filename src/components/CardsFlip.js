import { useState } from 'react'

const Card = ({ card, field, onClick }) => {
  if (!card) return null

  return (
    <div
      className="p-4 cursor-pointer ring-1 ring-blue-600 rounded-xl hover:shadow-md focus:outline-none"
      onClick={() => onClick(field === 'term' ? 'definition' : 'term')}
    >
      <span className="text-xs text-gray-500 uppercase">{field}</span>
      <div className="flex justify-center h-40 my-4 overflow-y-auto">
        <p>{card[field]}</p>
      </div>
    </div>
  )
}

export const CardsFlip = ({ cards }) => {
  const [cardIdx, setCardIdx] = useState(0)
  const [cardField, setCardField] = useState('term')

  if (cards.length === 0) return null

  return (
    <>
      <Card card={cards[cardIdx]} field={cardField} onClick={setCardField} />
      <div className="flex items-center justify-center mt-4 space-x-4">
        {cardIdx >= 1 && (
          <button
            onClick={() => {
              setCardIdx(cardIdx - 1)
              setCardField('term')
            }}
            className="p-1 text-blue-600 bg-blue-600 rounded-full focus:outline-none bg-opacity-10"
            aria-label="go to previous card"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Previous Card</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
          </button>
        )}
        {cardIdx < cards.length - 1 && (
          <button
            onClick={() => {
              setCardIdx(cardIdx + 1)
              setCardField('term')
            }}
            className="p-1 text-blue-600 bg-blue-600 rounded-full bg-opacity-10 focus:outline-none"
            aria-label="go to next card"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Next Card</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </button>
        )}
      </div>
    </>
  )
}
