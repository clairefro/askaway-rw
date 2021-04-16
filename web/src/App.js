import { useState, useEffect } from 'react'
import { FatalErrorBoundary } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { AppContext } from './context/AppContext'
import { randomUsername } from './utils/randomUsername'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.css'

const App = () => {
  const [username, setUsername] = useState(null)

  const context = {
    username,
    setUsername,
  }

  useEffect(() => {
    if (!username) {
      setUsername(randomUsername())
    }
  }, [username])

  return (
    <AppContext.Provider value={context}>
      <FatalErrorBoundary page={FatalErrorPage}>
        <RedwoodApolloProvider>
          <Routes username={username} />
        </RedwoodApolloProvider>
      </FatalErrorBoundary>
    </AppContext.Provider>
  )
}

export default App
