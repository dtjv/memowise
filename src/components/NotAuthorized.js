import Head from 'next/head'
import Link from 'next/link'
import { signIn } from 'next-auth/client'

import { Container } from './Container'

export const NotAuthorized = () => {
  return (
    <>
      <Head>
        <title>Not Authorized</title>
      </Head>
      <Container>
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900">
          Not Authorized
        </h1>
        <p className="text-xl font-normal text-gray-500">
          Please{' '}
          <button className="text-blue-600" onClick={() => signIn()}>
            Sign in
          </button>{' '}
          or return to{' '}
          <Link href="/">
            <a className="text-blue-600">Home Page.</a>
          </Link>
        </p>
      </Container>
    </>
  )
}
