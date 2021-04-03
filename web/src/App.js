import { FatalErrorBoundary } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { AppContext, defaultContext } from './context/AppContext'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.css'

const App = () => (
  <AppContext.Provider value={defaultContext}>
    <FatalErrorBoundary page={FatalErrorPage}>
      <RedwoodApolloProvider>
        <Routes />
      </RedwoodApolloProvider>
    </FatalErrorBoundary>
  </AppContext.Provider>
)

export default App
