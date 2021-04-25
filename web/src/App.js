import { useState, useEffect } from 'react'
import { FatalErrorBoundary } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { AppContext } from './context/AppContext'
import { randomUsername } from './utils/randomUsername'
import { useCookies } from 'react-cookie'
import { createClient } from '@supabase/supabase-js'
// import cache from './cache'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.css'

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

const App = () => {
  const [cookies, setCookie] = useCookies()
  const [username, setUsername] = useState(randomUsername())

  const context = {
    username,
    setUsername,
  }

  useEffect(() => {
    const usernameFromCookie = cookies.username
    if (usernameFromCookie) {
      setUsername(usernameFromCookie)
    } else {
      setCookie('username', username, { path: '/' })
    }
  }, [username, setCookie, cookies.username])

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
