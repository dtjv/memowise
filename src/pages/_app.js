import '../styles/app.css'
import { Provider } from 'next-auth/client'

import { Layout } from '@/components/Layout'

const App = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default App
