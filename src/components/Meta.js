import Head from 'next/head'
import { site } from '../data/site'

export const Meta = (props) => {
  const title = props.title ?? site.title
  const url = props.url ?? site.url
  const description = props.description ?? site.description

  return (
    <Head>
      {/*
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <meta name="lang" content="en" />
      <meta name="theme-color" content="#000" />
      <meta name="description" content={description} />

      <meta name="og:url" content={url} />
      <meta name="og:type" content="website" />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <title>{title}</title>
    </Head>
  )
}
