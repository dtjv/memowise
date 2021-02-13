import '../styles/app.css'
import { Provider } from 'next-auth/client'

const App = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App
