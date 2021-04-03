import React from 'react'

export const defaultContext = {
  username: 'foo',
}

export const AppContext = React.createContext(defaultContext)

export const useAppContext = () => React.useContext(AppContext)
