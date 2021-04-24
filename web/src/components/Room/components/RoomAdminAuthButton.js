import React, { useState } from 'react'
import { toast } from '@redwoodjs/web/toast'
import { useShittyAuth } from '../../../hooks/useShittyAuth'

export const RoomAdminAuthButton = ({ isAdmin, roomId }) => {
  const { grantAdmin, getAdminToken } = useShittyAuth()
  const [loading, setLoading] = useState(false)

  const getToken = async () => {
    const secret = prompt("What's the secret?")

    setLoading(true)

    const res = await getAdminToken({ roomId, secret })
    const { token, isValid } = res
    if (isValid && !!token) {
      grantAdmin({ roomId, token })
      toast.success('You are now room admin!')
    } else {
      toast.error('No!')
    }

    setLoading(false)
  }

  if (loading) return <span>...</span>

  if (isAdmin) {
    return (
      <span role="img" aria-label="star" title="You are admin">
        ⭐
      </span>
    )
  }

  return (
    <button onClick={getToken}>
      <span role="img" aria-label="padlock" title="Unlock room">
        🔒
      </span>
    </button>
  )
}
