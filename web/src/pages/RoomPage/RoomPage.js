import RoomCell from 'src/components/RoomCell'
import NewQuestion from 'src/components/NewQuestion'
import QuestionsCell from 'src/components/QuestionsCell'
import { useShittyAuth } from '../../hooks/useShittyAuth'
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'

const RoomPage = ({ id }) => {
  const { isAdmin, verifyToken } = useShittyAuth()
  const [cookies, _setCookies] = useCookies()

  // check room admin on mount and cookie change
  useEffect(() => {
    const token = cookies[id]
    if (token) {
      verifyToken({ roomId: id, token })
    }
  }, [cookies, verifyToken, id])

  return (
    <div>
      <RoomCell id={id} isAdmin={isAdmin} />
      <NewQuestion roomId={id} />
      <QuestionsCell roomId={id} isAdmin={isAdmin} />
    </div>
  )
}

export default RoomPage
