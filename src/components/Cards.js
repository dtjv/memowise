export const Cards = ({ cards }) => {
  const renderCards = cards.map((card, idx) => {
    return (
      <>
        <li
          key={idx}
          className="relative p-6 shadow-sm ring-1 ring-black ring-opacity-5 rounded-xl"
        >
          <p className="text-xs text-gray-500 uppercase">term</p>
          <div className="flex justify-center py-10">
            <p>{card.term}</p>
          </div>
          <div className="flex justify-end">
            <button
              className="p-1 text-blue-500 bg-blue-500 rounded-full bg-opacity-10"
              aria-label="add set to my account"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </button>
          </div>
        </li>
        <li className="relative p-6 shadow-sm ring-1 ring-gray-500 rounded-xl">
          <p className="text-xs text-gray-500 uppercase">definition</p>
          <div className="flex justify-center py-10">
            <p>{card.definition}</p>
          </div>
          <div className="flex justify-end">
            <button
              className="p-1 text-blue-500 bg-blue-500 rounded-full bg-opacity-10"
              aria-label="add set to my account"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </button>
          </div>
        </li>
      </>
    )
  })

  return <ul className="space-y-8">{renderCards}</ul>
}
