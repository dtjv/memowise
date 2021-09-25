import { useToggle } from '@/hooks/useToggle'

const grades = [
  { grade: 0, heading: 'Incorrect', description: 'Answer is a blank' },
  { grade: 1, heading: 'Incorrect', description: 'Answer is familiar' },
  { grade: 2, heading: 'Incorrect', description: 'Answer is easy' },
  { grade: 3, heading: 'Correct', description: 'Answered with difficulty' },
  { grade: 4, heading: 'Correct', description: 'Answered with hesitation' },
  { grade: 5, heading: 'Correct', description: 'Answered with perfect recall' },
]

export const StudyCard = ({ card, selectedGrade, onGradeSelected }) => {
  const [showFront, toggleShowFront] = useToggle(true)
  const cardField = showFront ? 'term' : 'definition'

  return (
    <div className="space-y-4">
      <div
        className="p-4 cursor-pointer ring-1 ring-blue-600 rounded-xl hover:shadow-md focus:outline-none"
        onClick={toggleShowFront}
      >
        <span className="text-xs text-gray-500 uppercase">{cardField}</span>
        <div className="flex justify-center h-40 my-4 overflow-y-auto">
          <p>{card[cardField]}</p>
        </div>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {grades.map(({ grade, heading, description }, index) => {
          const ring =
            selectedGrade.index === index
              ? 'ring-2 ring-blue-600'
              : 'ring-1 ring-gray-300'
          return (
            <li
              key={index}
              className={`flex flex-col items-center justify-center p-4 cursor-pointer shadow-sm ${ring} rounded-xl hover:shadow-lg`}
              onClick={() => onGradeSelected({ index, grade })}
            >
              <p className="font-medium text-gray-800">{heading}</p>
              <p className="text-sm text-center text-gray-500">{description}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
