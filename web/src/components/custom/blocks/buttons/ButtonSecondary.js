import React from 'react'
import { ButtonBase } from './ButtonBase'
import classNames from 'classnames'

export const ButtonSecondary = ({ children, className = '', ...rest }) => {
  const classes = classNames(
    'bg-transparent border-pink-600 text-pink-600',
    className
  )
  return (
    <ButtonBase {...rest} className={classes}>
      {children}
    </ButtonBase>
  )
}
