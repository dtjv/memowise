import Link from 'next/link'
import pluralize from 'pluralize'
import slugify from '@sindresorhus/slugify'

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

/*
 * Example of topics received:
 *
 * topics = [
 *   {
 *     name: 'Math',
 *     ...
 *     deckCount: 5,  // set by the caller of this component
 *   },
 *   ...
 * ]
 */
export const Topics = ({ topics }) => {
  let colorIdx = -1

  const renderTopics = topics.map((topic) => {
    colorIdx = getNextIndex(colorIdx)

    return (
      <li
        key={topic.id}
        className={`p-6 shadow-lg rounded-3xl bg-gradient-to-br ${colors[colorIdx].gradient}`}
      >
        <h2 className="text-2xl font-semibold">{topic.name}</h2>
        <p
          className={`mb-4 text-sm font-medium ${colors[colorIdx].text} uppercase text-shadow`}
        >
          {pluralize('set', topic.deckCount, true)}
        </p>
        <p className={`mb-8 font-medium ${colors[colorIdx].text} text-shadow`}>
          {topic.description}
        </p>
        <Link href={`/browse/${slugify(topic.name)}`}>
          <a
            className={`inline-flex items-center px-4 py-2 font-semibold ${colors[colorIdx].bg} rounded-lg bg-opacity-50`}
          >
            Explore {topic.name}
          </a>
        </Link>
      </li>
    )
  })

  return <ul className="text-white space-y-8">{renderTopics}</ul>
}
