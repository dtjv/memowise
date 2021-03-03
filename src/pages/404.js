import Head from 'next/head'
import Link from 'next/link'

import { Container } from '@/components/Container'

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <Container>
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900">
          Page Not Found
        </h1>
        <p className="text-xl font-normal text-gray-500">
          Return to{' '}
          <Link href="/">
            <a className="text-blue-600">Home Page.</a>
          </Link>
        </p>
      </Container>
    </>
  )
}

export default NotFoundPage
