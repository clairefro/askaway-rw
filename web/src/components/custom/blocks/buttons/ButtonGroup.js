import React from 'react'
import classNames from 'classnames'

export const ButtonGroup = ({ children, className = '', ...rest }) => {
  const classes = classNames('flex flex-wrap justify-center my-4', className)
  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  )
}
