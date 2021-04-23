import React from 'react'
import { PaddingBase } from './PaddingBase'

export const WhitePadding = ({ children }) => {
  return <PaddingBase className="bg-white">{children}</PaddingBase>
}
