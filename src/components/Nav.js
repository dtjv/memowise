import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'

import { GitHubIcon } from './icons/github'

export const Nav = () => {
  const [session] = useSession()
  const AuthButton = () => (
    <>
      {!session && (
        <button
          onClick={() => signIn()}
          className="inline-flex items-center px-3 py-1.5 text-base font-semibold text-white bg-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          aria-label="sign-in button"
        >
          Sign in
        </button>
      )}
      {session && (
        <button
          onClick={() => signOut()}
          className="inline-flex items-center px-3 py-1.5 text-base font-semibold text-white bg-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          aria-label="sign-out button"
        >
          Sign out
        </button>
      )}
    </>
  )

  return (
    <nav>
      <div className="flex items-center justify-between py-6 border-b border-gray-200">
        <div>
          <Link href="/">
            <a className="text-lg font-semibold tracking-wide">memowise</a>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <AuthButton />
          <a href="https://github.com/dtjv/memowise" aria-label="github logo">
            <GitHubIcon className="text-gray-500 hover:text-blue-600" />
          </a>
        </div>
      </div>
    </nav>
  )
}
