import React from 'react'
import classNames from 'classnames'

export const PaddingBase = ({ children, className = '' }) => {
  const classes = classNames('p-4 bg-opacity-70 rounded-lg my-4', className)
  return <div className={classes}>{children}</div>
}
