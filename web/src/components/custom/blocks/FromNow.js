import React, { useEffect, useState } from 'react'
import { fromNow } from '../../../utils/dates'

/** Sets up listener to rerender time distance string each minute */
/** Children must be a timestamp string */
export const FromNow = ({ children }) => {
  const [refresh, setRefresh] = useState(new Date().getTime())

  useEffect(() => {
    // trigger re-render every 60 seconds
    const tick = setInterval(() => {
      setRefresh(new Date().getTime())
    }, 60 * 1000)

    return () => {
      clearInterval(tick)
    }
  }, [])

  return <span>{refresh && fromNow(children)}</span>
}
