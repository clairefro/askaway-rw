import React from 'react'
import { PurplePadding } from './padding/PurplePadding'

export const FormWrapper = ({ children, title }) => {
  return (
    <PurplePadding>
      <div>
        {title && <h2 className="w-full text-center">{title}</h2>}
        {children}
      </div>
    </PurplePadding>
  )
}
