import Link from 'next/link'
import Image from 'next/image'
import { signIn, useSession } from 'next-auth/client'

export const Nav = () => {
  const [session] = useSession()

  const SignInButton = () => (
    <button
      onClick={() => signIn()}
      className="inline-flex items-center px-3 py-1.5 text-base font-semibold text-white bg-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
      aria-label="sign-in button"
    >
      Sign in
    </button>
  )

  const UserAvatar = () => (
    <Link href="/dashboard">
      <a>
        <Image
          src={session.user.image}
          className="rounded-full"
          alt={`avatar for user ${session.user.name}`}
          width={40}
          height={40}
        />
      </a>
    </Link>
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
          {session ? <UserAvatar /> : <SignInButton />}
        </div>
      </div>
    </nav>
  )
}
