import Link from 'next/link'
import pluralize from 'pluralize'

const colors = [
  {
    gradient: 'from-purple-400 to-purple-700',
    text: 'text-purple-100',
    bg: 'bg-purple-800',
  },
  {
    gradient: 'from-green-400 to-green-700',
    text: 'text-green-100',
    bg: 'bg-green-800',
  },
  {
    gradient: 'from-pink-400 to-pink-700',
    text: 'text-pink-100',
    bg: 'bg-pink-800',
  },
  {
    gradient: 'from-blue-400 to-blue-700',
    text: 'text-blue-100',
    bg: 'bg-blue-800',
  },
  {
    gradient: 'from-yellow-400 to-yellow-700',
    text: 'text-yellow-100',
    bg: 'bg-yellow-800',
  },
]

const getNextIndex = (idx = -1) => (idx === colors.length - 1 ? 0 : idx + 1)

export const Topics = ({ topics }) => {
  let colorIdx = -1

  const renderTopics = topics.map((topic) => {
    colorIdx = getNextIndex(colorIdx)

    return (
      <li
        key={topic.id}
        className={`p-6 shadow-lg rounded-2xl bg-gradient-to-br ${colors[colorIdx].gradient}`}
      >
        <h3 className="text-2xl font-semibold">{topic.name}</h3>
        <p
          className={`mb-4 text-sm font-medium ${colors[colorIdx].text} uppercase text-shadow`}
        >
          {pluralize('set', topic.numDecks, true)}
        </p>
        <p className={`mb-8 font-medium ${colors[colorIdx].text} text-shadow`}>
          {topic.description}
        </p>
        <Link href={`/browse/${encodeURIComponent(topic.slug)}`}>
          <a
            className={`inline-flex items-center px-4 py-2 font-semibold ${colors[colorIdx].bg} rounded-lg bg-opacity-50 hover:bg-opacity-90 focus:outline-none focus:bg-opacity-90`}
          >
            Explore {topic.name}
          </a>
        </Link>
      </li>
    )
  })

  return renderTopics.length === 0 ? null : (
    <ul className="text-white space-y-8">{renderTopics}</ul>
  )
}
