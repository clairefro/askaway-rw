import React, { useContext } from 'react'
import { Navbar } from '../components/custom/Navbar'
import { Container } from '../components/custom/blocks/Container'
import { Toaster } from '@redwoodjs/web/toast'
import { AppContext } from '../context/AppContext'

export const GlobalLayout = ({ children, username }) => {
  const { setUsername } = useContext(AppContext)

  const handleClick = () => {
    setUsername('PISTACHIO')
    console.log('clicked')
  }

  return (
    <div>
      <Navbar />
      <Toaster />
      <Container>
        <button onClick={handleClick}>Change username to PISTACHIO</button>
        {children}
      </Container>
    </div>
  )
}
