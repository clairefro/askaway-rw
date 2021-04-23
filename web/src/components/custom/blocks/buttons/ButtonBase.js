import React from 'react'
import classNames from 'classnames'

export const ButtonBase = ({ children, className = '', ...rest }) => {
  const classes = classNames(
    'rounded hover:opacity-75 px-4 py-2 border-2 uppercase font-semibold text-xs',
    className
  )
  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  )
}
