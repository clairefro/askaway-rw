import React from 'react'
import { Navbar } from '../components/custom/Navbar'
import { Toaster } from '@redwoodjs/web/toast'

export const GlobalLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Toaster />
      <div className="mx-auto p-2 sm:p-8">{children}</div>
    </div>
  )
}
