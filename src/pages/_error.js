import Head from 'next/head'
import Link from 'next/link'

import { Container } from '@/components/Container'

const Error = ({ statusCode }) => {
  const errorMessage = statusCode
    ? `An error ${statusCode} occurred on server`
    : 'An error occurred on client'

  return (
    <>
      <Head>
        <title>Internal Error</title>
      </Head>
      <Container>
        <div className="space-y-4">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Internal Error
          </h1>
          <p className="text-xl font-normal text-gray-500">{errorMessage}.</p>
          <p className="text-xl font-normal text-gray-500">
            Return to{' '}
            <Link href="/">
              <a className="text-blue-600">Home Page.</a>
            </Link>
          </p>
        </div>
      </Container>
    </>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
