import React from 'react'
import { ButtonBase } from './ButtonBase'
import classNames from 'classnames'

export const ButtonDanger = ({ children, className = '', ...rest }) => {
  const classes = classNames(
    'bg-gray-700 border-gray-700 text-white',
    className
  )
  return (
    <ButtonBase {...rest} className={classes}>
      {children}
    </ButtonBase>
  )
}
