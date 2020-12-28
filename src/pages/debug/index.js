import { useState } from 'react'
import useSWR from 'swr'
//import { dump } from '@/utils/debug'

const SkeletonText = () => {
  return (
    <div className="animate-pulse">
      <div className="w-full h-6 bg-blue-400 rounded"> </div>
    </div>
  )
}

const fetcher = (url) => fetch(url).then((r) => r.json())

const deckid = `5fe1268490b6eac9a9561113`

const Demo = () => {
  const [cardIdx, setCardIdx] = useState(0)
  const { data } = useSWR(`/api/decks/${deckid}`, fetcher)
  const isLoading = !data
  const cards = data?.deck.cards || []
  const currentCard = cards.length && cards[cardIdx]

  return (
    <div className="p-10 bg-gray-200">
      {isLoading ? (
        <SkeletonText />
      ) : (
        <>
          <p className="mb-4 font-bold">{currentCard.term}</p>
          <div className="bg-blue-400 rounded">
            {cards.map((card) => (
              <div key={card.id}>{card.term}</div>
            ))}
          </div>
          <button onClick={() => setCardIdx(() => cardIdx + 1)}>
            Choose Next Card
          </button>
        </>
      )}
    </div>
  )
}

export default Demo
