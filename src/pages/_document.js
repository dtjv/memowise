import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en" className="h-full">
        <Head />
        <body className="h-full">
          <Main className="h-full" />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
