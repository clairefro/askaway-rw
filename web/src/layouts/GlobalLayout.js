import React from 'react'
import { Navbar } from '../components/custom/Navbar/index'
import { Container } from '../components/custom/blocks/Container'
import { Toaster } from '@redwoodjs/web/toast'

export const GlobalLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Toaster />
      <Container>{children}</Container>
    </div>
  )
}
