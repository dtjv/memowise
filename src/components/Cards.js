export const Cards = ({ cards }) => {
  const renderCards = cards.map((card) => {
    return (
      <li key={card.id}>
        <div className="relative p-6 shadow-sm ring-1 ring-gray-300 rounded-xl">
          <div className="grid sm:grid-cols-3 space-y-6 sm:space-y-0">
            <div>
              <span className="text-xs text-gray-500 uppercase">term</span>
              <p className="font-medium text-gray-900">{card.term}</p>
            </div>
            <div>
              <span className="text-xs text-gray-500 uppercase">
                definition
              </span>
              <p className="text-gray-900 sm:col-span-2">{card.definition}</p>
            </div>
          </div>
        </div>
      </li>
    )
  })

  return <ul className="space-y-10">{renderCards}</ul>
}
