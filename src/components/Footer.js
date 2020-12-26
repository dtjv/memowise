import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="py-12 bg-gray-50">
      <div className="max-w-3xl px-4 mx-auto antialiased sm:px-8 md:px-12 lg:px-0 divide-y divide-gray-200">
        <ul className="pb-12 grid grid-cols-2 sm:grid-cols-3 gap-y-10">
          <li className="space-y-5">
            <h4 className="font-semibold text-gray-500 uppercase">Topics</h4>
            <ul className="text-gray-500 space-y-4">
              <li>
                <Link href="/browse/math">
                  <a> Math </a>
                </Link>
              </li>
              <li>
                <Link href="/browse/languages">
                  <a> Languages </a>
                </Link>
              </li>
              <li>
                <Link href="/browse/science">
                  <a> Science </a>
                </Link>
              </li>
              <li>
                <Link href="/browse/all-the-things">
                  <a> All The Things </a>
                </Link>
              </li>
            </ul>
          </li>
          <li className="space-y-5">
            <h4 className="font-semibold text-gray-500 uppercase">Features</h4>
            <ul className="text-gray-500 space-y-4">
              <li>Flashcard Study</li>
              <li>Self Test</li>
              <li>Create Flashcards</li>
              <li>Personalized Collection</li>
            </ul>
          </li>
          <li className="space-y-5">
            <h4 className="font-semibold text-gray-500 uppercase">About</h4>
            <ul className="text-gray-500 space-y-4">
              <li>How I Built MemoWise</li>
              <li>Study Algorithm</li>
            </ul>
          </li>
        </ul>
        <div className="pt-8 text-center">
          <p className="text-base font-medium text-gray-500">
            Made with ☕️☕️☕️ by David Valles
          </p>
        </div>
      </div>
    </footer>
  )
}
