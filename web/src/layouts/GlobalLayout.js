import React from 'react'
import { Navbar } from '../components/custom/Navbar'

export const GlobalLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}
