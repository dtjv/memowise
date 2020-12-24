export const Cards = ({ cards }) => {
  const renderCards = cards.map((card) => {
    return (
      <li key={card.id} className="space-y-4">
        <div className="relative p-6 shadow-sm ring-1 ring-gray-300 rounded-xl">
          <p className="text-xs text-gray-500 uppercase">term</p>
          <div className="flex justify-center py-10">
            <p>{card.term}</p>
          </div>
        </div>
        <div className="relative p-6 shadow-sm ring-1 ring-gray-300 rounded-xl">
          <p className="text-xs text-gray-500 uppercase">definition</p>
          <div className="flex justify-center py-10">
            <p>{card.definition}</p>
          </div>
        </div>
      </li>
    )
  })

  return <ul className="space-y-14">{renderCards}</ul>
}
