import React from 'react'
import { ButtonBase } from './ButtonBase'
import classNames from 'classnames'

export const ButtonPrimary = ({ children, className = '', ...rest }) => {
  const classes = classNames(
    'bg-transparent border bg-pink-600 text-white',
    className
  )
  return (
    <ButtonBase {...rest} className={classes}>
      {children}
    </ButtonBase>
  )
}
